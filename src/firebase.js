// Import the functions you need from the SDKs you need
import { initializeApp } from "/node_modules/firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "/node_modules/firebase/firestore";
import { getAuth } from "firebase/auth";   


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAJpPSiOo9OesYjreyWcn0tuGkVWJ_PFs",
  authDomain: "reflejos-66014.firebaseapp.com",
  projectId: "reflejos-66014",
  storageBucket: "reflejos-66014.appspot.com",
  messagingSenderId: "317448421660",
  appId: "1:317448421660:web:6b72629a8cddebd0bc3ad9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Retrieve a single document
const docRef = doc(db, "deportistas", "LM1o3rbYNbJTZ5xSvxg2");
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

export const datos = docSnap.data();
// Get the id to clinical history
let resultadosClinicos = datos.historiaclinica[0]._key.path.segments[6];

// Get the clinical history document data
const docRefClinicos = doc(db, "historiaclinica", resultadosClinicos);
const docSnapClinicos = await getDoc(docRefClinicos);
if (docSnapClinicos.exists()) {
  console.log("Document data:", docSnapClinicos.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

export const historiaClinica = docSnapClinicos.data();
console.log(historiaClinica);

// Retrieve a collection of documents
const docDepor = collection(db, "deportistas");
const DocDeportistas = await getDocs(docDepor);
export let Usu = [];
export const auth = getAuth(app);

DocDeportistas.forEach((deportista) => {
  // Convertir el Timestamp a una fecha de JavaScript
  console.log(deportista.id);
  const objetoUsu = {}; // Create a new object on each iteration
  objetoUsu.id = deportista.id;
  objetoUsu.nombre = deportista.data().nombre;
  objetoUsu.apellido = deportista.data().apellido1;
  Usu.push(objetoUsu);
  console.log(Usu);
});