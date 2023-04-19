// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth"

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnJXEoqk2v1ciB7bOmndTbMwXgpulyd9Q",
  authDomain: "finalprojectfordigital.firebaseapp.com",
  projectId: "finalprojectfordigital",
  storageBucket: "finalprojectfordigital.appspot.com",
  messagingSenderId: "993383228383",
  appId: "1:993383228383:web:2c44f70a02611e610c9a6a",
  measurementId: "G-80PLZ8G7ER"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth  = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
export const signInWithgoogleRedirect = () => signInWithRedirect(auth,provider)


export const db = getFirestore()

export const createUserDocumentFromoAuth = async (userAuth) =>{
    const userDocRef = doc(db,'users',userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)


    if(!userSnapshot.exists()) {
        const {displayName,email} = userAuth
        const createdAt = new Date()
        try{
            await setDoc(userDocRef ,{
                displayName,
                email,
                createdAt,
            })
        }catch(error){
            console.log("error creating th user", error.message)
        }
    }
    console.log(userDocRef,"this is")
    return userDocRef

}