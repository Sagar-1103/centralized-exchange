import { type EngineRequest } from "../store/spot";
import { Market } from "../utils/orderbook";

export default function handleCreateMarket(message: EngineRequest) {
    const { name, decimals, symbol } = message.payload as { name: string; symbol: string; decimals: number };

    const market = new Market(symbol);

    if (!market.exists()) {
        market.init(name,decimals);
    }

    return {
        symbol,
        name,
        decimals,
    }
}