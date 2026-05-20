export type EngineRequestType = "create_order";

export interface EngineRequest {
    correlationId:string;
    payload:Record<string,unknown>;
    type:EngineRequestType;
    responseQueue:string;
}

export interface EngineResponse {
    correlationId:string;
    data?:unknown;
    ok:boolean;
    error?: string;
}