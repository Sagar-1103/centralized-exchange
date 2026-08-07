import type { EngineRequest } from "../store/spot";

export default function handleOnboard(message: EngineRequest) {
    const {userId, amount} = message.payload;
    
    return {
        name: 'Sagar',
    }
}