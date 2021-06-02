import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCwCmv_xnXZZNsE451ET7ZQ7DK-An6jOA4",
  authDomain: "crwn-clothing-db-f5dcf.firebaseapp.com",
  projectId: "crwn-clothing-db-f5dcf",
  storageBucket: "crwn-clothing-db-f5dcf.appspot.com",
  messagingSenderId: "227884933229",
  appId: "1:227884933229:web:cf51a6fd0cd1cc71f9df64",
  measurementId: "G-S98FVQG54T"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  console.log(userRef);
  const snapShot = await userRef.get();
  console.log(snapShot);

  const { displayName, email, phoneNumber, photoURL } = userAuth;

  if (!snapShot.exists) {
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        phoneNumber,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return userRef;
};

export default firebase;
