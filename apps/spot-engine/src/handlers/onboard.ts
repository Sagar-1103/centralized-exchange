import type { EngineRequest } from "../store/spot";
import { Balance } from "../utils/balance";

export default function handleOnboard(message: EngineRequest) {
    const {userId, amount} = message.payload as { userId: string; amount: number };

    const balance = new Balance(userId);

    const collateral = balance.onRamp(amount);

    return {
        collateral,
    }
}