import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBWoLzrwkMLlphPaYIOG0_OZdHuqq4CJqE",
    authDomain: "notes-3fc8b.firebaseapp.com",
    databaseURL: "https://notes-3fc8b.firebaseio.com",
    projectId: "notes-3fc8b",
    storageBucket: "notes-3fc8b.appspot.com",
    messagingSenderId: "304330842698"
  };
  firebase.initializeApp(config);

const database = firebase.database()

export default database