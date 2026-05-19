interface Collateral {
    available:number;
    locked:number;
}

type Side = "LONG" | "SHORT";
type Type = "LIMIT" | "MARKET";
type Status = "FILLED" | "CANCELLED";

interface Position {
    market:string;
    side:Side;
    qty:number;
    margin:number;
    liquidationPrice:number;
    averagePrice:number;
}

interface Order {
    orderId:string;
    market:string;
    side:Side;
    type:Type;
    qty:number;
    margin:number;
    price:number;
    status:Status;
}

interface Fill {
    maker:number;
    taker:number;
    market: string;
    qty: number;
    price: number;
    long: number;
    short: number;
}

interface User {
    userId:string;
    username:string;
    password:string;
    collateral:Collateral;
    positions:Position[];
    orders:Order[];
}

interface Orderbook {
    bids: Map<number, Order[]>;
    asks: Map<number, Order[]>;
    lastTradedPrice:number;
    indexPrice:number;
}

export const ORDERBOOKS = new Map<string,Orderbook>();
export const USERS:User[] = [];