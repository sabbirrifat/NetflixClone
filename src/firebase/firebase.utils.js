import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDmxlSz-eANNbh3NsXKZhmM9TjvLxmv3d0",
    authDomain: "netflix-clone-bb922.firebaseapp.com",
    databaseURL: "https://netflix-clone-bb922.firebaseio.com",
    projectId: "netflix-clone-bb922",
    storageBucket: "netflix-clone-bb922.appspot.com",
    messagingSenderId: "863706590947",
    appId: "1:863706590947:web:8a881890b9c4f05cc3dfd6",
    measurementId: "G-8PBRQ53Y9L"
  };


firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });


export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        let photoUrl = 'default';
        if(userAuth.photoURL){
            photoUrl = userAuth.photoURL;
        }
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                photoUrl,
                ...additionalData
            });
        } catch (err) {
            console.error('error creating user', err.message);
        }
    }
    return userRef;
} 

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
