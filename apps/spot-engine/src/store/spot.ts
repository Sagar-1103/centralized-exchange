import type BTree from "sorted-btree";

export enum EngineType {
    ONBOARD,
    GET_BALANCE,
    CREATE_MARKET,
    GET_DEPTH,
    CREATE_ORDER,
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

export enum OrderSide {
    BUY,
    SELL,
}

export enum OrderType {
    MARKET,
    LIMIT,
}

export enum OrderStatus {
    OPEN,
    PARTIALLY_FILLED,
    FILLED,
    CANCELLED,
}

export interface Order {
    orderId: string;
    userId: string;
    symbol: keyof typeof ASSETS;
    side: OrderSide;
    status: OrderStatus;
    type: OrderType;
    price: number;
    qty: number;
    filledQty: number;
    fills: Fill[];
    createdAt: number;
}

export interface RestingOrder {
    orderId: string;
    userId: string;
    symbol: keyof typeof ASSETS;
    side: OrderSide;
    status: OrderStatus;
    type: OrderType.LIMIT;
    price: number;
    qty: number;
    filledQty: number;
    createdAt: number;
}

export interface Fill {
    fillId: string;
    symbol: string;
    makerId: string;
    takerId: string;
    price: number;
    qty: number;
    createdAt: number;
}

export interface OrderbookLevel {
    price: number;
    restingOrders: RestingOrder[];
    totalQty: number;
}

export interface Orderbook {
    asks: BTree<number,OrderbookLevel>;
    bids: BTree<number, OrderbookLevel>;
}

export interface DepthLevel {
    price: number;
    qty: number;
}

export interface DepthResponse {
    symbol: string;
    asks: DepthLevel[];
    bids: DepthLevel[];
}

export interface ScaledAsset {
    available: bigint;
    locked: bigint;
};

export interface DescaledAsset {
    available: number;
    locked: number;
}

export type ScaledCollateral = Record<string, ScaledAsset>;
export type DescaledCollateral = Record<string, DescaledAsset>;

export const USD_DECIMALS = 8; 

export const initAssets = () => {
    const assets:Map<string,{ symbol: string, name: string, decimals: number }> = new Map();
    assets.set("usd",{
        symbol: "usd",
        name: "USD",
        decimals: USD_DECIMALS,
    });
    return assets;
}

export const ASSETS: Map<string,{ symbol: string, name: string, decimals: number }> = initAssets();

export const BALANCES = new Map<string,ScaledCollateral>();
export const ORDERS = new Map<string,Order>();
export const ORDERBOOKS = new Map<string,Orderbook>();
export const FILLS = new Map<string,Fill>(); 