import type { EngineResponse } from "../utils/spot-client";

interface PendingResponse<T> {
    resolve: (response: EngineResponse<T>) => void;
    reject: (error:Error) => void;
    timeout: ReturnType<typeof setTimeout>;
}

const createPendingMap = <T>() => {
    return new Map<string,PendingResponse<T>>();
}

const pendingResponses = createPendingMap();

export const waitForEngineResponse = <T>(correlationId: string, timeoutMs: number): Promise<EngineResponse<T>> => {
    return new Promise((resolve,reject)=>{
        const timeout = setTimeout(() => {
            pendingResponses.delete(correlationId);
            reject(new Error("Response Timeout"));
        }, timeoutMs);

        pendingResponses.set(correlationId,{
            resolve: (res) => resolve(res as EngineResponse<T>),
            reject,
            timeout,
        });
    })
}

export const resolveEngineResponse = <T>(response: EngineResponse<T>) => {
    const pendingResponse = pendingResponses.get(response.correlationId);
    if (!pendingResponse) return;

    clearTimeout(pendingResponse.timeout);
    pendingResponses.delete(response.correlationId);
    pendingResponse.resolve(response);
}