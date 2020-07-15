import firebase from "firebase";

const firebaseApp = firebase.initializeApp(
{
        apiKey: "AIzaSyB7rdX_qZ1X7mlGlPyYNfhtMmqS3VSWgI4",
        authDomain: "instagram-clone-9ad21.firebaseapp.com",
        databaseURL: "https://instagram-clone-9ad21.firebaseio.com",
        projectId: "instagram-clone-9ad21",
        storageBucket: "instagram-clone-9ad21.appspot.com",
        messagingSenderId: "287119701668",
        appId: "1:287119701668:web:e68f8ca7a5cb863a005831",
        measurementId: "G-BF7B5HE8FM"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db,auth,storage};
  