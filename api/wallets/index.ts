import {NowRequest, NowResponse} from '@vercel/node';
export default (req: NowRequest, res: NowResponse) => {
    const {
        query: { id },
    } = req

    res.send(`GET ALL MY WALLETS`)
}
