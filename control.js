//Link: https://firebase.google.com/docs/database/web/start

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBd0hB1Ml3FdCQfewp9TMBWSl6XrlEVeL0",
    authDomain: "iot-cb-mrh3.firebaseapp.com",
    projectId: "iot-cb-mrh3",
    storageBucket: "iot-cb-mrh3.appspot.com",
    messagingSenderId: "653734309990",
    appId: "1:653734309990:web:d988e5cf402a69beda3da7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = firebase.database();


// Khai báo biến và liên kết thẻ bên HTML
const led01_on = document.getElementById("led01_on");
const led01_off = document.getElementById("led01_off");
const light01 = document.getElementById("light01");

//Auto Update Data from Firebase
const temp = document.getElementById("temp");
database.ref("/TT_IoT/Temp").on("value", function(snapshot){
    let t = snapshot.val();
    temp.innerHTML = t;

    console.log(t);
})

// database.ref("/TT_IoT/BULB_01").on("value", function(snapshot){
//     let t = snapshot.val();
//     if(t==0)
//         light01.src = "./img/light_bulb_off.png";
//     else
//         light01.src = "./img/light_bulb_on.png";

// })

database.ref("/TT_IoT").on("value", function(snapshot){
    let t = snapshot.val(); //Array {key:value, key:value,...}
    console.log(t);

    if(t["BULB_01"]==0)
        light01.src = "./img/light_bulb_off.png";
    else
        light01.src = "./img/light_bulb_on.png";

})

//Xử lý sự kiện
led01_on.onclick = function() {
    light01.src = "./img/light_bulb_on.png";


    //Update to Firebase
    database.ref("/TT_IoT").update({
        "BULB_01" : 1
    })

}

led01_off.onclick = function() {
    light01.src = "./img/light_bulb_off.png";

    //Update to Firebase
    database.ref("/TT_IoT").update({
        "BULB_01" : 0
    })
}