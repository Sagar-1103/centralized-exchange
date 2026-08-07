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

export interface EngineResponse<T> {
    correlationId: string;
    data?: T;
    error?: string;
    ok: boolean;
}

export interface Collateral {
    available: bigint;
    locked: bigint;
}

export const BALANCES = new Map<string,Collateral>();