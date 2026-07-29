// ==========================
// GOALZON APP.JS
// Firebase + Counters
// ==========================


import {

initializeApp

}

from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";



import {

getDatabase,

ref,

get,

set,

update,

increment,

onValue

}

from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";




// FIREBASE


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
"1:965130579100:web:d0ff12a72386391e371159"

};



const app =
initializeApp(firebaseConfig);



const db =
getDatabase(app);




const counterRef =
ref(db,"counters");






// ==========================
// USERS ICON
// ==========================


function usersView(number){


if(number === 0){

return "👤 0";

}



if(number === 1){

return "👤 1";

}



return "👥 " + number;



}








// ==========================
// LIVE COUNTERS
// ==========================


onValue(

counterRef,

(snapshot)=>{


const data =
snapshot.val() || {};



document.getElementById("registrations").textContent =

usersView(data.registrations || 0);




document.getElementById("visitors").textContent =

"🏙️ " + (data.visitors || 0);




document.getElementById("likes").textContent =

"❤️ " + (data.likes || 0);



}

);








// ==========================
// DEVICE ID
// ==========================


let deviceId =
localStorage.getItem("goalzon_device");



if(!deviceId){


deviceId =
"goalzon_" + crypto.randomUUID();



localStorage.setItem(

"goalzon_device",

deviceId

);


}






// ==========================
// PRE REGISTER
// ==========================


const registerBtn =
document.getElementById("registerBtn");



if(registerBtn){


registerBtn.onclick = async()=>{


const userRef =
ref(

db,

"registeredDevices/"+deviceId

);



const exists =
await get(userRef);



if(exists.exists()){


alert(
"أنت مسجل مسبقاً ✅"
);


return;

}



await set(

userRef,

{

registered:true,

date:Date.now()

}

);



await update(

counterRef,

{

registrations:
increment(1)

}

);



alert(
"تم التسجيل المسبق بنجاح 💚"
);



};


}
// ==========================
// LIKE BUTTON ❤️
// ==========================


const likeBtn =
document.getElementById("likeBtn");



if(likeBtn){


likeBtn.onclick = async()=>{



if(localStorage.getItem("goalzon_like")){


alert(
"لقد سجلت إعجابك مسبقاً ❤️"
);


return;


}



await update(

counterRef,

{

likes:
increment(1)

}

);




localStorage.setItem(

"goalzon_like",

"true"

);



likeBtn.textContent =
"❤️ تم الإعجاب";



};



}







// ==========================
// VISITORS 🏙️
// ==========================


if(
!localStorage.getItem("goalzon_visit")
){



await update(

counterRef,

{

visitors:
increment(1)

}

);



localStorage.setItem(

"goalzon_visit",

"true"

);



}








// ==========================
// COUNTDOWN
// ==========================


const launchDate =

new Date(

"September 1, 2026 12:00:00"

).getTime();




function countdown(){



let distance =
launchDate - Date.now();




if(distance < 0){

return;

}



let days =
Math.floor(
distance /
(1000*60*60*24)
);



let hours =
Math.floor(
(distance %
(1000*60*60*24))
/
(1000*60*60)
);



let minutes =
Math.floor(
(distance %
(1000*60*60))
/
(1000*60)
);



let seconds =
Math.floor(
(distance %
(1000*60))
/
1000
);





const d =
document.getElementById("days");


const h =
document.getElementById("hours");


const m =
document.getElementById("minutes");


const s =
document.getElementById("seconds");



if(d)d.textContent=days;

if(h)h.textContent=hours;

if(m)m.textContent=minutes;

if(s)s.textContent=seconds;



}



setInterval(
countdown,
1000
);


countdown();








// ==========================
// VERSION
// ==========================


onValue(

ref(db,"settings/version"),

(snapshot)=>{


const version =
document.getElementById("version");



if(version){

version.textContent =
snapshot.val() || "BETA";

}


});