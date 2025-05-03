const firebaseConfig = {
  apiKey: "AIzaSyDtg4qFG7edEizG0xKTr0RLKdxtaCHe45M",
  authDomain: "iranvabistore.firebaseapp.com",
  projectId: "iranvabistore",
  storageBucket: "iranvabistore.appspot.com",
  messagingSenderId: "550281336186",
  appId: "1:550281336186:web:ab8b0503f50a98657a72c3",
  measurementId: "G-NG60PS146Y"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
