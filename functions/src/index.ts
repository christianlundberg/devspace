import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase)

export const addSpace = functions.firestore.document('spaces/{spaceId}').onCreate(event => {
    const docRef = admin.firestore().doc(`/users/${event.data.data().userId}`);
    return admin.firestore().runTransaction(transaction => {
        return transaction.get(docRef)
            .then(snapshot => {
                const spaces: any[] = snapshot.get('spaces') || [];
                spaces.push({...event.data.data(), id: event.data.id});
                transaction.set(docRef, {spaces}, {merge: true});
            });
    });
});

export const deleteSpace = functions.firestore.document('spaces/{spaceId}').onDelete(event => {
    const docRef = admin.firestore().doc(`/users/${event.data.previous.data().userId}`);
    return admin.firestore().runTransaction(transaction => {
        return transaction.get(docRef)
            .then(snapshot => {
                const spaces: any[] = (snapshot.get('spaces') || []).filter(space => space.id != event.data.id);
                transaction.set(docRef, {spaces}, {merge: true});
            });
    });
});


