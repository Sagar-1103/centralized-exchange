import { Recovery } from "@repo/shared";
import { env } from "./constants/env";
import { engineRequestHandlers } from "./handlers";
import type { EngineRequest } from "./store/spot";
import { connectRedis, readFromStream, sendResponse } from "./utils/redis";


const startEngine = async() => {
    console.log(`Spot engine listening to ${env.spotIncomingQueue}`);
    for (;;) {
        let message: EngineRequest;
        try {
            let item = await readFromStream();

            if (!item) continue;

            message = JSON.parse(item?.[0]?.messages?.[0]?.message.data) as EngineRequest;
        } catch (error) {
            console.log("Skipping invalid broker message");
            continue;
        }

        try {
            const requestHandler = engineRequestHandlers[message.type];
            const data = requestHandler(message);
            await sendResponse(message.responseQueue,{
                correlationId: message.correlationId,
                data,
                ok: true,
            });
        } catch (error) {
            console.log("Error while processing engine request: ",error);
            await sendResponse(message.responseQueue,{
                correlationId: message.correlationId,
                ok: false,
                error: error instanceof Error ? error.message : "spot-engine-error", 
            });
        }

    }
}

const main = async() => {
    await connectRedis();
    const recovery = new Recovery(env.prefix,env.accessKeyId,env.secretAccessKey,env.bucket,env.region,env.endpoint);
    await recovery.restoreFromLatestSnapshot();
    await recovery.restoreEventsFromStream();
    await startEngine();
    await recovery.captureSnapshot(env.backupIntervalMs);
}

main();