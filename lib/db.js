import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();
const app = firebase.app();

export function createUser(uid, data) {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true }, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Data saved successfully!');
            }
        });
}

export function createSite(data) {
    const site = firestore.collection('sites').doc();
    site.set(data);

    return site;
}
export function createFeedback(data) {
    return firestore.collection('feedback').add(data);
}
export function deleteFeedback(id) {
    return firestore.collection('feedback').doc(id).delete();
}

export async function createCheckoutSession(uid) {
    const checkoutSessionRef = await firestore
        .collection('users')
        .doc(uid)
        .collection('checkout_sessions')
        .add({
            price: 'price_1ICWOiFQeVUZR0DXY01Y56FI',
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });

    checkoutSessionRef.onSnapshot(async (snap) => {
        const { sessionId } = snap.data();
        if (sessionId) {
            const stripe = await getStripe();
            stripe.redirectToCheckout({ sessionId });
        }
    });
}

export async function goToBillingPortal() {
    const functionRef = app
        .functions('us-central1')
        .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
    const { data } = await functionRef({
        returnUrl: `${window.location.origin}/account`
    });
    window.location.assign(data.url);
}
