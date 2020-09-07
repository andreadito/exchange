import { NowRequest, NowResponse } from '@vercel/node';
import firebase from 'firebase-admin';
import {accountKey} from "../../../configs";


firebase.initializeApp({
    // @ts-ignore
    credential: firebase.credential.cert(accountKey),
    databaseURL: process.env.FIREBASE_DB_URL
});

const db = firebase.firestore();

export enum Operation {
    ADD = 'add',
    SUBTRACT = 'sub'
}

export function calculateBalance(balance: number, operation: Operation, value: number) {
    switch (operation) {
        case Operation.ADD: {
            return balance + value;
        }
        case Operation.SUBTRACT: {
            return balance - value;
        }
        default:
            return balance;
    }
}

export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: { id, walletId, operation, value }
    } = req


    try {
        const userRef = db.collection(`users`).doc(id as string);
        const walletsRef = await userRef.collection('wallets');
        const walletRef = await walletsRef.doc(walletId as string);

        const wallet = await walletRef.get();

        if (wallet.exists) {
            // @ts-ignore
            const { balance } = wallet.data();
            if (balance) {
                const newBalance = calculateBalance(balance, operation as Operation, Number(value));
                const writeResult = await walletRef.update({ balance: newBalance });
                res.json({success: true, ...writeResult});
            }
        } else {
            res.send({success: false});
        }


    } catch (error) {
        res.status(400);
        res.send({error});
    }
}
