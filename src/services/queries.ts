import axios from 'axios';

export async function queryWallets() {
    try {
        // Hardcoded user for brevity - In a real world scenario should be dynamic and an auth system should be added
        const resp = await axios.get('api/wallets/Dtn53Ebo2ULFpHWUsTAp/');
        return resp.data;
    } catch (err) {
        return err;
    }
}

export function getRate(_: any, base: string, symbol: string) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const promise = axios.get(`/api/rates?base=${base}&symbol=${symbol}`, {
        cancelToken: source.token
    })
    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled by React Query');
    }

    return promise;
}
