var fileButton = document.getElementById('bblogo');

// var firebaseConfig = {
//     apiKey: "AIzaSyDqq4CrAW3Qh4LNMLt3MWgj9gOhZxsnjzQ",
//     authDomain: "docmaster-69.firebaseapp.com",
//     projectId: "docmaster-69",
//     storageBucket: "docmaster-69.appspot.com",
//     messagingSenderId: "113213208283",
//     appId: "1:113213208283:web:e1fb855d6dd36851c4befe",
//     measurementId: "G-Y7QBHWQ944"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   // Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = firebase.storage();

// Create a storage reference from our storage service

var id;
var filename;
var file;
// Create a child reference
function getuid(){
// filename = document.getElementById('filename');
 var box = document.getElementById('getid');
 id = box.value;
 console.log(id);
}

var fileButton = document.getElementById('bblogo');
  fileButton.addEventListener('change',function(e){

  
    var storage = firebase.storage();
  console.log("INSIDE ala FUNCTION");
  file = e.target.files[0];
  console.log(file);
 
});

var uploadbutton = document.getElementById('submitButton');
uploadbutton.addEventListener("click",function(f){
  var filenameip = document.getElementById('filenameip');
  var filename = filenameip.value;
  console.log("FILENAME AHEEEE:- "+filename)
  var storageRef =firebase.storage().ref(id+"/"+filename);
  var task = storageRef.put(file);
  alert("File Uploaded!")
});

function getlink(htmlid){
  var docName =htmlid.innerHTML;
  var box = document.getElementById('getid');
  id = box.value;
  var storage = firebase.storage();
  var storageRef = storage.ref();
  //var pathReference = storage.ref(id+"/"+docName)
  // var storageRef =firebase.storage().ref("docmaster-69.appspot.com/"+id+"/"+docName);
  storageRef.child(id+"/"+docName).getDownloadURL()
  .then((url) => {
    // var xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   var blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();

    var img = document.getElementById('docimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
    console.log("ERROR IST:"+error );
  });
}
// fileButton.addEventListener('change',function(e){
// console.log("INSIDE FUNCTION");
// const file = e.target.files[0];
// console.log(file);
// var storageRef =firebase.storage().ref('ganditguli/'+filename);
// var task = storageRef.put(file);
// task.on('state_changed',
//   function error(err){  
//     console.log("ERROR IST "+err);
//   },
//   function complete() {
//     console.log('');
//     }
  
//   );
// });