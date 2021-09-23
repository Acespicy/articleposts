import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDd8bgWBQVgDk86Pt_mgBjyPdbGN6dRlPA",
  authDomain: "technicallassessment.firebaseapp.com",
  projectId: "technicallassessment",
  storageBucket: "technicallassessment.appspot.com",
  messagingSenderId: "93722463677",
  appId: "1:93722463677:web:3706deace934d52436d6d4",
  measurementId: "G-KC0N7HE5KE"
};

//check if firebase is initialized
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;