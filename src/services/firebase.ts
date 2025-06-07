import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH4MACMxTN2oDU-TDCyfB15KtI_qCN6bk",
  authDomain: "bookqin-e8f5a.firebaseapp.com",
  projectId: "bookqin-e8f5a",
  storageBucket: "bookqin-e8f5a.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult, type User };