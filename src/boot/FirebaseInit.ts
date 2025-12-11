// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBlQH3XF4iYpBnXZqXzU3vAM1XDalOyGA0',
  authDomain: 'easyjobtracking.firebaseapp.com',
  projectId: 'easyjobtracking',
  storageBucket: 'easyjobtracking.firebasestorage.app',
  messagingSenderId: '1065443481058',
  appId: '1:1065443481058:web:90870b42ebcda19e25d5bb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
