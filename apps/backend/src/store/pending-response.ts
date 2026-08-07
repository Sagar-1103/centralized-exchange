import type { EngineResponse } from "../utils/spot-client";

interface PendingResponse {
    resolve: (response: EngineResponse) => void;
    reject: (error:Error) => void;
    timeout: ReturnType<typeof setTimeout>;
}

const pendingResponses = new Map<string,PendingResponse>();

export const waitForEngineResponse = (correlationId: string, timeoutMs: number): Promise<EngineResponse> => {
    return new Promise((resolve,reject)=>{
        const timeout = setTimeout(() => {
            pendingResponses.delete(correlationId);
            reject(new Error("Response Timeout"));
        }, timeoutMs);

        pendingResponses.set(correlationId,{
            resolve,
            reject,
            timeout,
        });
    })
}

export const resolveEngineResponse = (response: EngineResponse) => {
    const pendingResponse = pendingResponses.get(response.correlationId);
    if (!pendingResponse) return;

    clearTimeout(pendingResponse.timeout);
    pendingResponses.delete(response.correlationId);
    pendingResponse.resolve(response);
}