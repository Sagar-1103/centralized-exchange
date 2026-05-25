import type { OpenOrder, OrderbookEntry, Side } from "../store/perps-store"

export class Orderbook {
    asks:Map<number,OrderbookEntry>;
    bids:Map<number,OrderbookEntry>;
    indexPrice:number;
    lastTradedPrice:number;
    market:string;

    constructor(_asks:Map<number,OrderbookEntry>,_bids:Map<number,OrderbookEntry>,_indexPrice:number,_lastTradedPrice:number,_market:string) {
        this.asks = _asks; 
        this.bids = _bids;
        this.indexPrice = _indexPrice;
        this.lastTradedPrice = _lastTradedPrice;
        this.market = _market;
    }

    getOrderBookEntry(price:number,side:Side) {
        if (side==="LONG") {
            return this.bids.get(price);
        } else {
            return this.asks.get(price);
        }
    }

    deleteOrderBookEntry(price:number,side:Side,orderId:string) {
        const orderbookEntry = this.getOrderBookEntry(price,side);
        const openOrders = orderbookEntry?.openOrders;
        if (!openOrders?.length) return;

        const newOpenOrders = openOrders.filter(order => order.orderId !== orderId);

        if (newOpenOrders.length===0) {
            if (side==="LONG") {
                this.bids.delete(price);
            } else {
                this.asks.delete(price);
            }
        } else {
            const newOrderbookEntry:OrderbookEntry = {
                availableQty:newOpenOrders.reduce((acc,curr)=>{
                    acc += (curr.qty - curr.filledQty);
                    return acc;
                },0),
                openOrders:newOpenOrders,
            }
            if (side==="LONG") {
                this.bids.set(price,newOrderbookEntry);
            } else {
                this.asks.set(price,newOrderbookEntry);
            }
        }
    }
}