import {NowRequest, NowResponse} from '@vercel/node';
import firebase from 'firebase-admin';
import {accountKey} from "../../../configs";

firebase.initializeApp({
    // @ts-ignore
    credential: firebase.credential.cert(accountKey),
    databaseURL: process.env.FIREBASE_DB_URL
});

const db = firebase.firestore();

export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: { id, walletId },
    } = req

    try {
        const userRef = db.collection(`users`).doc(id as string);
        const walletsRef = await userRef.collection('wallets');
        const walletRef = await walletsRef.doc(walletId as string);
        const wallet = await walletRef.get();

        if (wallet.exists) {
            const data = wallet.data()
            res.json(data);
        } else {
            res.send({});
        }

    } catch (error) {
        res.status(400);
        res.send({error});
    }
}
