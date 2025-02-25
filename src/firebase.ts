import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2ywpqNa0_COGXrT8dk5GaqVCXzvBKsJs",
  authDomain: "desenv-consignado-clientes.firebaseapp.com",
  projectId: "desenv-consignado-clientes",
  storageBucket: "desenv-consignado-clientes.firebasestorage.app",
  messagingSenderId: "997986926647",
  appId: "1:997986926647:web:2c2f239c0784443dc33fb2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider }