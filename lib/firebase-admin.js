import admin from 'firebase-admin';

if (!admin.apps.length) {
    // console.log(
    //     'PRIVATE_KEY',
    //     JSON.parse(process.env.FIREBASE_PRIVATE_KEY).replace(/\\n/g, '\n')
    // );
    admin.initializeApp({
        credential: admin.credential.cert({
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey:
                process.env.FIREBASE_PRIVATE_KEY[0] === '-'
                    ? process.env.FIREBASE_PRIVATE_KEY
                    : JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        }),
        databaseURL: 'https://react2025-fast-feedback.firebaseio.com'
    });
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
