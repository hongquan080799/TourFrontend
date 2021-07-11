import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDCIKah5cKOBbsL_NWbbwpcXXB_afgEr7E",
  authDomain: "tourdulich-nckh.firebaseapp.com",
  projectId: "tourdulich-nckh",
  storageBucket: "tourdulich-nckh.appspot.com",
  messagingSenderId: "36754695337",
  appId: "1:36754695337:web:bca32ff2c5e1e0bf0d75b8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  export const store =  firebase.storage()
  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export default firebase
  