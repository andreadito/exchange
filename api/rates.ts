import {NowRequest, NowResponse} from '@vercel/node';
import fetch, {Response} from 'node-fetch';

export async function checkResponse(response: Response) {
    if (response.ok) {
        return await response.json();
    } else {
        const {error} = await response.json();
        throw new Error(error);
    }
}

export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: {base, symbol},
    } = req

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')

    if (base && symbol) {
        const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbol}`

        if (base === symbol) {
            res.json({
                base,
                date: new Date(Date.now()).toDateString(),
                rates: {[symbol as string]: 1}
            })
        }
        try {
            const response: Response = await fetch(url);
            const result = await checkResponse(response);

            // Add base due to an issue with the API
            result.rates = {...result.rates, [base as string]: 1};

            res.send(result);

        } catch (error) {
            res.status(400);
            res.send({error: error.message});
        }

    } else {
        res.status(400);
        res.send({error: 'base and symbols are required'});
    }

}
