// Import the functions you need from the SDKs you need
import { initializeApp } from "/node_modules/firebase/app";
import { getFirestore } from "/node_modules/firebase/firestore";
import { doc, getDoc } from "/node_modules/firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANXyZ-JPFz6vzkVWosjzFgEqew1yRTjA0",
  authDomain: "reflejoss-f0ed6.firebaseapp.com",
  projectId: "reflejoss-f0ed6",
  storageBucket: "reflejoss-f0ed6.appspot.com",
  messagingSenderId: "583481929258",
  appId: "1:583481929258:web:a6b909f561aa1ea1a41d53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 const docRef = doc(db, "deportistas", "LM1o3rbYNbJTZ5xSvxg2");
 const docSnap = await getDoc(docRef);
 if (docSnap.exists()) {
     console.log("Document data:", docSnap.data());
   } else {
     // docSnap.data() will be undefined in this case
     console.log("No such document!");
   }
 
  export const datos=docSnap.data(); 
  //consigo id a historia clinica
let resultadosClinicos=datos.historiaclinica[0]._key.path.segments[6];

 //datos documento historia clinica
 const docRefClinicos = doc(db, "historiaclinica", resultadosClinicos);
 const docSnapClinicos = await getDoc(docRefClinicos);
 if (docSnapClinicos.exists()) {
     console.log("Document data:", docSnapClinicos.data());
   } else {
     // docSnap.data() will be undefined in this case
     console.log("No such document!");
   }

  export const historiaClinica=docSnapClinicos.data();
   console.log(historiaClinica);