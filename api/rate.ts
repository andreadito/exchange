import {NowRequest, NowResponse} from '@vercel/node';

export default (req: NowRequest, res: NowResponse) => {
    const { query } = req;

    console.log(query);

    res.send(`RATE !`)
}
