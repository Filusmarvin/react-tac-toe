var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
   apiKey: "AIzaSyCr8VzHSMa-im3-w0VQ1Ha4tuAwUAqBIYc",
   authDomain: "tic-tac-toe-c1131.firebaseapp.com",
   databaseURL: "https://tic-tac-toe-c1131.firebaseio.com",
   projectId: "tic-tac-toe-c1131",
   storageBucket: "tic-tac-toe-c1131.appspot.com",
   messagingSenderId: "13031685869"
 });
var base = Rebase.createClass(app.database())
