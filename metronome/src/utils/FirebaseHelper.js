import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDoc, setDoc, doc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDDQ13v18Xl9lhjUMM_Pi1Ea9lFj7-9Nnw",
    authDomain: "music-metronome.firebaseapp.com",
    projectId: "music-metronome",
    storageBucket: "music-metronome.appspot.com",
    messagingSenderId: "944699218798",
    appId: "1:944699218798:web:d58f889ef1765f0c84ff7f",
    measurementId: "G-9CM19LQ591"
  };
  
let app = null;

export function GetFirebaseDb() {
    if(app == null) {
        app = initializeApp(firebaseConfig);
    }
    return getFirestore(app);
}

export const DBWrite = async (db, path, id, data) => {
    try {
        const docRef = await setDoc(doc(db, path, id), data);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const DBRead = async (db, path, id) => {
    const docRef = doc(db, path, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return docSnap.data();
    }
    else {
        return null;
    }
}

export const DBExists = async(db, path, id) => {
    const docRef = doc(db, path, id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return true;
    }
    else {
        return false;
    }
}