import firebase from 'firebase';

export const initialize = () => {
    firebase.initializeApp(firebaseConfig);
}

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC9kONAw6qGX4Zs8zyJPNW-YUfelO_yEG8",
    authDomain: "ubicar-3872e.firebaseapp.com",
    projectId: "ubicar-3872e",
    storageBucket: "ubicar-3872e.appspot.com",
    messagingSenderId: "111778446614",
    appId: "1:111778446614:web:4c3f3806cb992e1249a437"
};