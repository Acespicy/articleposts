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

// const firebaseConfig = {
//   apiKey: "AIzaSyDqYgMtehGrYz3r_UrFO3JYr6FY424fxBw",
//   authDomain: "assessment-53019.firebaseapp.com",
//   projectId: "assessment-53019",
//   storageBucket: "assessment-53019.appspot.com",
//   messagingSenderId: "363868243519",
//   appId: "1:363868243519:web:c43d26017ea1ba76035a8a",
//   measurementId: "G-HPD84113CL"
// };

export default firebase;