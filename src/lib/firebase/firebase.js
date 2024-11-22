import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxRh-QzEV3P9h1hyEqkJ4hK5XQT9ToBiM",
    authDomain: "deep-and-kelly.firebaseapp.com",
    databaseURL: "https://deep-and-kelly-default-rtdb.firebaseio.com",
    projectId: "deep-and-kelly",
    storageBucket: "deep-and-kelly.firebasestorage.app",
    messagingSenderId: "481084446448",
    appId: "1:481084446448:web:0a248637144bd809c65435",
    measurementId: "G-M5MWF34KHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };