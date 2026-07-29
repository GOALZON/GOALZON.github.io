// ===============================
// GOALZON FIREBASE.JS
// ===============================


import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";


import {
getDatabase,
ref,
set,
get,
update,
remove,
increment,
onValue
}
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";



import {
getAuth
}
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";




// FIREBASE CONFIG

const firebaseConfig = {

apiKey:
"AIzaSyDIBRuRASLMcjuJA1fC67PMKdtI-tr2nPw",

authDomain:
"goalzon.firebaseapp.com",

databaseURL:
"https://goalzon-default-rtdb.firebaseio.com",

projectId:
"goalzon",

storageBucket:
"goalzon.firebasestorage.app",

messagingSenderId:
"965130579100",

appId:
"1:965130579100:web:d0ff12a72386391e371159",

measurementId:
"G-CSNTCR4Q74"

};




// INITIALIZE

const app =
initializeApp(firebaseConfig);



const db =
getDatabase(app);



const auth =
getAuth(app);




// EXPORT

export {

db,

auth,

ref,

set,

get,

update,

remove,

increment,

onValue

};