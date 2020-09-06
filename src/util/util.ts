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
