import { NowRequest, NowResponse } from '@vercel/node';
import firebase from 'firebase-admin';
import * as admin from "firebase-admin";
import DocumentSnapshot = admin.firestore.DocumentSnapshot;


const accountKey = {
        "type": "service_account",
        "project_id": "exchange-57496",
        "private_key_id": "8a697faca083e50ae152b8ceb472dc036314b74a",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjIJ8dzSbImVkK\nPUu12tmUn2TC23AZVlqswNxCQFBKo5ejfrWEeefrNAQYFYSWNN1vuq8htOKioqmy\nniYaGrKtRgHS4K1MHZxMzFmWZR7Zs5boaMnMK+oSfp1qEkDfQ+oQkXIGwfJ+i7UR\nzY7srhi6cI2kYkk9hZlWEOnJDjl5Q808OZAYdVN72fZNJXRKLNOqCvuCYnIdgGTG\ngyaihWGzvLMSK8pehIKZjs7rVnfBhyyWGKZM0xNDWexIKL4blI2e6EpA2tKSUSNr\nipEnBYecPdCoMnJTCei4YvxEivI9VYdVRv/h4ek0b92Ws4K0+obdB3wuBBqNqhf3\nIBJgG1DPAgMBAAECggEANYU4b1Clzt7xJbjipDG/fVGmf3/7kXSRn2hPW7U6IqL1\n14B1EZfljXeteDFnJNkHZeb8GrT8PpvbzWyx15K22L7FTmjEstpsM45APmXC725K\nrsnim4g07gh4oRqICjiADRuLK8hqRTaVG9gzclfUaScQccSFfxfcLS6zZXGzTaN5\nDJ00fQdpt2LmdjPPEiw7unFyMGE3EFPy5/3xdZsd5W4FXh+egGi+M9GufOc5aXFN\n9VrtfnZBq6t9NZytdA5RoTVwjItmSeIkgtyGYYEpU2qeCtUGKn914ynHYdKaU8WG\nGHiIC1dRwcdTz6xjkBHeN3vBSw15KRJ3p2Zxp+RIAQKBgQDQv1DOAxkWSya4OjUp\ndTw4wTXeR6qk64+fRuILuXEQVD4SLIO3v08matBVWjXlwuiQh95b0VHfgOv4GYK0\n599gVSXz3ph0OIQ9f43QSTwK1vRKGTiIjb8DL+T09wqtG5uoxVgV3VqULuyY9vur\nSHHsH0nFPTsIn/9sk4/GwfUiAQKBgQDIDa56ScuAnZV6x+F9dK1iwNzGJuPP8FnW\nhk9v+KtQY+aa2OG2qR+EdyITYj7OtOPQSmnJBnkUr6DUPNFianQggcBpXKoC2c6h\ntoqb4ul7AG+tsA/U9wQTb02vKAudU3JdQ7ptSxckVlc4onpYSaHjnOGW86hTjAsA\nzZ62dQDSzwKBgGvOQjcC1pPy395JAWeVyjItZlqTfIeLuDKz8s3HSaL7Pss3/haJ\nUKEwjMNnwWoVjPIHmUimA7h/5l3NHvm6vlwL3Xviu61Z+sGf/GdTSxT2CleySsYL\nHljRBVeVtgfMuEkjEejI1pys1zfwZe0BjwQ47GpWwwQjTVCPrLMjPCwBAoGAGTB/\n064PDbbJ55fbcKyMWG7oXZrv/HLLHRP0VKj/CTRLCRxd714ENe26QK6SMfzc4pE8\nGK/T9yLWIWM3CilVTfKIg7vDPHCob/xIH7DGrVI0va35kFs6DChro65rJ/gl4lBw\n3Oojk9O7T8pFlXBQDhTm4tbzTvHHQOajIV5CKEkCgYBkXzsREVAPfIySHiZRTEFk\nAM3CBYnlWjHuLn9eNplRnbly/FR2Pd8TAYAmEhHeHblE9vJ0E15duJcVetKssTri\nntcAx3tF8uR/IbJxbj/JuitR+YDBRjaVFDGtPpPaTdCP2i42u5GaQoSUk6ZXsmVC\niOkm5ig/1bPTsFAmYXSaNw==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-miu5u@exchange-57496.iam.gserviceaccount.com",
        "client_id": "115722094917007346654",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-miu5u%40exchange-57496.iam.gserviceaccount.com"
    }
;

firebase.initializeApp({
    // @ts-ignore
    credential: firebase.credential.cert(accountKey),
    databaseURL: "https://exchange-57496.firebaseio.com"
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
