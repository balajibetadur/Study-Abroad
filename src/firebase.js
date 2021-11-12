import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwJWfOqzuX9ZkPofTkZ5zO9pPUthkXmEI",
  authDomain: "gre-words-4adf1.firebaseapp.com",
  projectId: "gre-words-4adf1",
  storageBucket: "gre-words-4adf1.appspot.com",
  messagingSenderId: "846255191177",
  appId: "1:846255191177:web:617b84e7fec9a1d9600258",
  measurementId: "G-DVRZYTBZN8"
};

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDDO5QyhtHrADsdYAyHkICQmcLXSIi6Jm8",
//   authDomain: "gre-words-37a8c.firebaseapp.com",
//   projectId: "gre-words-37a8c",
//   storageBucket: "gre-words-37a8c.appspot.com",
//   messagingSenderId: "610614067247",
//   appId: "1:610614067247:web:f257ca33b8e7affd21c6da",
//   measurementId: "G-84CZB54ZMN"
// };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, provider }
export default db