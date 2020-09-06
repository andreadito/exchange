import {NowRequest, NowResponse} from '@vercel/node';
export default (req: NowRequest, res: NowResponse) => {
    const {
        query: { id },
    } = req

    res.send(`Mutate WALLET id ${id}!`)
}
