import type { EngineRequest } from "../store/spot";
import { Balance } from "../utils/balance";

export default function handleGetBalance(message: EngineRequest) {
    const userId = message.payload.userId as string;

    const balance = new Balance(userId);

    const collateral = balance.getDescaledBalance();

    return {
        collateral,
    };
}