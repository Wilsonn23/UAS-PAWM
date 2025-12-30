import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase dari google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyAE8g3IH9fghnuc77fsm-Yj-QYoYtcQ4tg",
  authDomain: "virtuallab-b69f8.firebaseapp.com",
  projectId: "virtuallab-b69f8",
  storageBucket: "virtuallab-b69f8.firebasestorage.app",
  messagingSenderId: "663393452055",
  appId: "1:663393452055:android:dbe6e5618f8f81e6269c52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth (persistence handled automatically in React Native)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
