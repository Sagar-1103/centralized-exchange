import BTree from "sorted-btree";
import { ASSETS, ORDERBOOKS, type Orderbook, type OrderbookLevel } from "../store/spot";

export class Market {
    private name!: string;
    private symbol: string;
    private decimals!: number;

    constructor(symbol: string) {
        this.symbol = symbol;
    }

    public exists() {
        return Boolean(ORDERBOOKS.get(this.symbol));
    }

    private get() {
        return ORDERBOOKS.get(this.symbol) as Orderbook;
    }

    public init(name: string, decimals: number) {
        ASSETS.set(this.symbol,{
            name,
            decimals,
            symbol: this.symbol,
        });
        ORDERBOOKS.set(this.symbol,{
            asks: new BTree<number,OrderbookLevel>(),
            bids: new BTree<number, OrderbookLevel>(),
        });
        this.decimals = decimals;
        this.name = name;
    }

    public getDepth() {

    }

    public createOrder() {

    }
    
}