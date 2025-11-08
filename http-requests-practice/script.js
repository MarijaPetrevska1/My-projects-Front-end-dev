// Using jQuery AJAX

let userList=document.getElementById("userList");
let btnAjax=document.getElementById("btnAjax");

btnAjax.addEventListener("click", function() {
    userList.innerHTML="";
    $.ajax({
        url:"https://jsonplaceholder.typicode.com/users",
        method: "GET",
        success: function (data) {
            data.forEach(user => {
                let li=document.createElement("li");
                li.innerText=`${user.id}. ${user.name} (${user.email})`;
                userList.append(li);
            });
        },
        error: function(err) {
            console.log("Error:", err);
        }
    });
});


// Using Fetch API

// let btnFetch=document.getElementById("btnFetch");

// btnFetch.addEventListener("click", function () {
//     userList.innerHTML="";
//     fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response=>response.json())
//     .then(data => {
//         data.forEach(user => {
//             let li=document.createElement("li");
//             li.innerText=`${user.id}. ${user.name} (${user.email})`;
//             userList.append(li);
//         });
//     })
//     .catch(error=>console.log("Error: ", error));
// });

// Using XMLHttpRequest ( old way )

let btnXHR=document.getElementById("btnXHR");

btnXHR.addEventListener("click", function () {
    userList.innerHTML="";

    let xhr=new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.onload=function() {
        if(xhr.status === 200){
            let data=JSON.parse(xhr.responseText);
            data.forEach(user => {
                let li=document.createElement("li");
                li.innerText=`${user.id}. ${user.name} (${user.email})`;
                userList.append(li);
            });
        } else {
            console.log("Request failed with status", xhr.status);
        }
    };
    xhr.onerror=function () {
        console.log("Network error!");
    };
    xhr.send();
})