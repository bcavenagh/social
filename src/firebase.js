import fire from 'firebase';

var config = {
  apiKey: "AIzaSyDBiG6wdq5_94LzJ4D6HadnL7iMrzU3a1o",
  authDomain: "social-a969a.firebaseapp.com",
  databaseURL: "https://social-a969a.firebaseio.com",
  projectId: "social-a969a",
  storageBucket: "social-a969a.appspot.com",
  messagingSenderId: "742658564132"
};
fire.initializeApp(config);
export default fire;