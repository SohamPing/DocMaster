const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

var admin = require("firebase-admin");
require("firebase/auth");
require("firebase/firestore");
var serviceAccount = require("./key.json");   
const { auth, firestore } = require('firebase');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var flag =0;
var firebaseConfig = {
    apiKey: "AIzaSyDqq4CrAW3Qh4LNMLt3MWgj9gOhZxsnjzQ",
    authDomain: "docmaster-69.firebaseapp.com",
    projectId: "docmaster-69",
    storageBucket: "docmaster-69.appspot.com",
    messagingSenderId: "113213208283",
    appId: "1:113213208283:web:e1fb855d6dd36851c4befe",
    measurementId: "G-Y7QBHWQ944"
  };
  // Initialize Firebase
  const storageAdd = "docmaster-69.appspot.com";
  firebase.initializeApp(firebaseConfig);
  const db = admin.firestore();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static("public"));

app.route("/")
        .get(function (req,res) {
            res.render('index')
});

app.route('/signin')
    .get(function (req,res) { 
        res.render('signin');
});

app.post('/signin',(req,res)=>{
  var email,password;
  email = req.body.loginemail;
  password = req.body.loginpassword;
 
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    res.redirect('/StudentDashboard/id='+userCredential.user.uid);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send('<center><h2>'+errorMessage+'</h2></center>');
  });
});

app.route('/signup')
    .get(function (req,res) { 
        res.render('signup')
});

app.post('/signup',(req,res)=>{
    var arr=[],status,email,password;
    email = req.body.email.toString();
    password = req.body.password.toString();   
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
  
    var user = userCredential.user;
    const collec = db.collection("Student").doc(userCredential.user.uid);
    collec.set({
      Name : req.body.name,
      Email : req.body.email.toString(),
      uid : userCredential.user.uid,
      Status : req.body.status.toString(),
      Filenames : arr
    })
   
    res.redirect('/StudentDashboard/id='+userCredential.user.uid);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("ERROR IS "+ errorMessage);
    res.send('<center><h2>'+errorMessage+'</h2></center>');

    // ..
  });
});

app.get('/StudentDashboard/id=:id',async (req,res)=>{
  var doclen=[],docnum,docMap;
  var Id = req.params.id;
  var ref = db.collection('Student').doc(Id);
  const snapshot = await ref.get();
  var name = snapshot.data().Name;
  doclen = snapshot.data().Filenames;
  docnum = doclen.length;
 
  res.render('StudentDashboard',{Id:Id,Name:name, docMap:docMap, doclen:doclen, docnum:docnum });
  })
 
  app.post('/StudentDashboard/id=:id', async(req,res)=>{
    var id = req.params.id; 
    var filenamearr=[];
    var filename = req.body.filename;
    var file = req.body.bblogo;
   

    var ref = db.collection('Student').doc(id);
    const snapshot = await ref.get();
    var update =ref.update({
      Filenames : admin.firestore.FieldValue.arrayUnion(filename)
    });
    filenamearr = snapshot.data().Filenames;
    
    res.redirect('/StudentDashboard/id='+id);
    flag=1;
  })

app.route('dashboard')
    .get(function (req,res){ 
        res.render('dashboard');
 });

app.listen(process.env.PORT||3000,function(){
    console.log("Server started on port 3000");
});

