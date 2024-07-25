import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDM4_6irMDTHSiagaoZF5PZsEsuajsEQGA",
  authDomain: "news-f534b.firebaseapp.com",
  projectId: "news-f534b",
  storageBucket: "news-f534b.appspot.com",
  messagingSenderId: "592966968826",
  appId: "1:592966968826:web:754709e0af127037d0b043",
  measurementId: "G-DS92KDCPFG",
};

const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app) ; 