import { getScale } from "@repo/shared";
import { ASSETS, BALANCES, USD_DECIMALS, type DescaledCollateral, type ScaledCollateral } from "../store/spot";

export class Balance {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    private get() {
        let balance = BALANCES.get(this.userId);
        if (!balance) {
            balance = this.init();
        }
        return balance;
    }

    private set(newBalance: ScaledCollateral) {
        BALANCES.set(this.userId,newBalance);
    }

    init(): ScaledCollateral {
        const balance = {
            "usd": {
                available: BigInt(0),
                locked: BigInt(0)
            } 
        };

        this.set(balance);
        return balance;
    }

    public onRamp(amount: number) {
        const usdScale = getScale(USD_DECIMALS);
        const value = usdScale * BigInt(amount);
        const oldBalance = this.get();
        if (!oldBalance["usd"]) return;
        const balance: ScaledCollateral = {
            ...oldBalance,
            "usd": {
                available: oldBalance["usd"].available + value,
                locked: oldBalance["usd"].locked,
            },
        };
        this.set(balance);
        return this.getDescaledBalance();
    }

    public getDescaledBalance() {
        const scaledBalance = this.get();
        const balance: DescaledCollateral = {};
        for(const [key,value] of Object.entries(scaledBalance)) {
            const asset = ASSETS.get(key);
            if (!asset) continue;
            const scale = getScale(asset.decimals);
            balance[key] = { 
                available: Number(value.available / scale),
                locked: Number(value.locked / scale),
            };
        }
        return balance;
    }
}