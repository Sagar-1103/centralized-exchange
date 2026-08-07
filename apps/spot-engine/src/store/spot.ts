export enum EngineType {
    ONBOARD,
    CREATE_MARKET
}

export interface EngineRequest {
    correlationId: string;
    payload: Record<string,unknown>;
    responseQueue: string;
    type: EngineType;
}

export interface EngineResponse {
    correlationId: string;
    data?: unknown;
    error?: string;
    ok: boolean;
}