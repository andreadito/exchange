export enum Currency {
    EUR = 'EUR',
    GBP = 'GBP',
    USD = 'USD',
}

export interface WalletData {
    balance: number;
    currency: Currency;
}

export interface Wallet {
    id: string,
    data: WalletData
}

export interface Rate {
    symbol: string;
    value: string;
}

export const MIN_ALLOWED = 0.5;

export function convertValue(value: number, rate: number): number {
    return value * rate;
}

export function limitDecimal(value: string) {
    return (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value
}
