import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDhdDFZ1eNqsB_NQa0tjOkN0AY9A41Se78",
  authDomain: "lessbook-ffccf.firebaseapp.com",
  projectId: "lessbook-ffccf",
  storageBucket: "lessbook-ffccf.appspot.com",
  messagingSenderId: "553474768982",
  appId: "1:553474768982:web:28b37e0d45cfe22185bbf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);