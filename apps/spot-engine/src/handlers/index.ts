import { EngineType, type EngineRequest } from "../store/spot";
import handleCreateMarket from "./createMarket";
import handleCreateOrder from "./createOrder";
import handleGetBalance from "./getBalance";
import handleGetDepth from "./getDepth";
import handleOnboard from "./onboard";

export type RequestHandler = (message: EngineRequest) => unknown;

export const engineRequestHandlers: Record<EngineType,RequestHandler> = {
    [EngineType.ONBOARD]: handleOnboard,
    [EngineType.GET_BALANCE]: handleGetBalance,
    [EngineType.CREATE_MARKET]: handleCreateMarket,
    [EngineType.GET_DEPTH]: handleGetDepth,
    [EngineType.CREATE_ORDER]: handleCreateOrder,
} 