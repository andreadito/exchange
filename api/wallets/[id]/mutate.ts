import { NowRequest, NowResponse } from '@vercel/node';
import firebase from 'firebase-admin';


const accountKey = {
    "type": process.env.FIREBASE_type,
    "project_id": process.env.FIREBASE_project_id,
    "private_key_id": process.env.FIREBASE_private_key_id,
    "private_key": process.env.FIREBASE_private_key,
    "client_email": process.env.FIREBASE_client_email,
    "client_id": process.env.FIREBASE_client_id,
    "auth_uri": process.env.FIREBASE_auth_uri,
    "token_uri": process.env.FIREBASE_token_uri,
    "auth_provider_x509_cert_url": process.env.FIREBASE_auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.FIREBAE_client_x509_cert_url
}

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
