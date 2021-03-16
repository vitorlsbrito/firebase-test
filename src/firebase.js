require('dotenv').config();
const { v4 } = require('uuid');
const admin = require('firebase-admin');

const serviceAccount = require('./database/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const add = async () => {
    const docRef = db.collection('users').doc(v4());
    
    await docRef.set({
        name: 'Vitor',
        age: 29
    });

    console.log(docRef);
};

const list = async () => {
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>',  doc.data());
    });
}

const update = async () => {
    const docRef = db.collection('users').doc('957eb2db-e2fa-44fd-ae75-59dbaeacde7c');
    
    await docRef.update({
        age: 30
    });

    console.log(docRef);
}

const remove = async () => {
    const res = await db.collection('users').doc('lRtxb4CIBEYIZISLnx7k').delete();

    console.log(res);
}

remove();