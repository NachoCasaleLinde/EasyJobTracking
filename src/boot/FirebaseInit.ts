// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export default app;
