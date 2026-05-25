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

export interface Collateral {
    available:number;
    locked:number;
}

export type Side = "LONG" | "SHORT";
export type Type = "LIMIT" | "MARKET";
export type Status = "FILLED" | "CANCELLED";

export interface Position {
    positionId:string;
    userId:string;
    market:string;
    type:Type;
    qty:number;
    margin:number;
    liquidationPrice:number;
    averagePrice:number;
}

export interface OpenOrder {
    orderId:string;
    userId:string;
    market:string;
    side:Side;
    type:"LIMIT";
    qty:number;
    filledQty: number;
    margin:number;
    price:number;
    status:Status;
    createdAt:number;
}

export interface OrderbookEntry {
    availableQty:number;
    openOrders:OpenOrder[];
}

export interface Orderbook {
    asks:Map<number,OrderbookEntry>;
    bids:Map<number,OrderbookEntry>;
    lastTradedPrice:number;
    indexPrice:number;
}

interface Fill {
    fillId:string;
    orderId:string;
    maker:number;
    taker:number;
    market: string;
    qty: number;
    price: number;
    long: number;
    short: number;
}

export interface Order {
  orderId: string;
  userId: string;
  side: Side;
  type: Type;
  market: string;
  price: number | null;
  qty: number;
  filledQty: number;
  status: Status;
  fills: Fill[];
  createdAt: number;
}

export const COLLATERALS = new Map<string,Collateral>();
export const POSITIONS = new Map<string,Position[]>();
export const ORDERS = new Map<string,Order>();
export const ORDERBOOKS = new Map<string,Orderbook>();
export const FILLS = new Map<string,Fill>();