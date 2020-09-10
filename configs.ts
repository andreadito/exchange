export const accountKey = {
    "type": "service_account",
    "project_id": "exchange-57496",
    "private_key_id": process.env.FIREBASE_private_key_id,
    "private_key": process.env.FIREBASE_private_key && process.env.FIREBASE_private_key.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-miu5u@exchange-57496.iam.gserviceaccount.com",
    "client_id": process.env.FIREBASE_client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FIREBASE_client_x509_cert_url
}
