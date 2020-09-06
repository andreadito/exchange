import {NowRequest, NowResponse} from '@vercel/node';
import fetch, {Response} from 'node-fetch';


export async function checkResponse(response: Response) {
    if(response.ok) {
        return await response.json();
    } else {
        const { error } = await response.json();
        throw new Error(error);
    }
}

export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: { base, symbols },
    } = req

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')

    if (base && symbols) {
        const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`

        try {
            const response: Response = await fetch(url);
            const result = await checkResponse(response);
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
