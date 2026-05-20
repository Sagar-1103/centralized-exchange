export type EngineRequestType = "create_order";

export interface EngineRequest {
    correlationId:string;
    responseQueue:string;
    type:EngineRequestType;
    payload:Record<string,unknown>;
}

export interface EngineResponse {
    correlationId:string;
    ok:boolean;
    error?:string;
    data?:unknown;
}
