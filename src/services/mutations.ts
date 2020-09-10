import axios from 'axios';

export interface Exchange {
    walletid: string;
    operation: string;
    value: number;
}
export async function exchange({walletid, operation, value}: Exchange) {
    try {
        const url = `api/wallets/Dtn53Ebo2ULFpHWUsTAp/mutate?walletId=${walletid}&operation=${operation}&value=${value}`;
        const resp = await axios.get(url);
        return resp.data;
    } catch (err) {
        return err;
    }
}
