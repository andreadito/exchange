import axios from 'axios';

export async function queryWallets() {
    try {
        const result = await fetch('api/wallets/Dtn53Ebo2ULFpHWUsTAp/');
        return result.json();
    } catch (e){
        return e
    }
}

export function getRate(_: any, base: string, symbol: string) {

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const promise = axios.get(`/api/rates?base=${base}&symbols=${symbol}`, {
        cancelToken: source.token
    })

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled by React Query');
    }

    return promise;
}
