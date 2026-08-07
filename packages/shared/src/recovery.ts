import { S3Client } from "bun";

export class Recovery {
    private client: S3Client;
    private prefix: string;

    constructor(prefix: string,accessKeyId: string,secretAccessKey: string,bucket: string, region: string, endpoint: string) {
        this.client = new S3Client({
            accessKeyId,
            secretAccessKey,
            bucket,
            endpoint,
            region,
        });
        this.prefix = prefix;
    }

    async captureSnapshot<T>(data: T,totalSnapshots: number,backupIntervalMs: number) {
        try {
            setInterval(async () => {
                const response = await this.client.list({
                    prefix: this.prefix,
                });

                const prevSnapshots = response.contents?.filter(snapshot => snapshot.size !==0);

                const key = prevSnapshots?.[0]?.key;

                if (prevSnapshots && prevSnapshots.length >= totalSnapshots && key ) {
                    await this.client.delete(key);
                    console.log(`Deleted snapshot ${key}`);
                }

                const stamp = Date.now();

                await this.client.write(`${this.prefix}data-${stamp}.json`, JSON.stringify(data),{
                    type: "application/json"
                });

                console.log(`Capture snapshot at ${stamp}`);

            }, backupIntervalMs);
        } catch (error) {
            console.log("Error capturing snapshot");
        }
    }

    async restoreEventsFromStream() {

    }

    async restoreFromLatestSnapshot<T>(callback: (data: T) => void) {
        try {
            const response = await this.client.list({
                prefix: this.prefix,
            });

            const snapshots = response.contents?.filter(snapshot => snapshot.size!=0);

            if (!snapshots?.length) {
                console.log("No snapshots available to be restored");
                return;
            }

            const latestSnapshot = snapshots[snapshots.length-1];
            if (!latestSnapshot) return;

            const file = this.client.file(latestSnapshot.key);
            const data = await file.json();
            callback(data);

        } catch (error) {
            console.log("Error restoring data from latest snapshot: ",error);
        }
    }
}

