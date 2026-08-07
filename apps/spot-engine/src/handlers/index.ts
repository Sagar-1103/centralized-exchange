import { EngineType, type EngineRequest } from "../store/spot";
import handleOnboard from "./onboard";

export type RequestHandler = (message: EngineRequest) => unknown;

export const engineRequestHandlers: Record<EngineType,RequestHandler> = {
    [EngineType.ONBOARD]: handleOnboard,
    [EngineType.CREATE_MARKET]: handleOnboard,
} 