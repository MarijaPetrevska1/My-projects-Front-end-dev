console.log("============== Local Storage ==============");
// *localStorage* provides persistent storage in the browser (~5MB)
// Data is stored with no expiration time and remains available even after the browser is closed or the user navigates away from the page
// Usecases:
// => saving user preferences
// => tracking user/app state
// => storing authentication info etc...

let user = {
    firstName: "Bob",
    lastName: "Bobsky",
    age: 34
}

// ===> Storing Data
localStorage.setItem("john", "John Doe");
// NOTE: When working with object, you must first serialize them (transfer them into JSON format)
localStorage.setItem("currentUser", JSON.stringify(user));

// ===> Retrieving Data
const johnName = localStorage.getItem("john")
console.log(johnName);

const currentUserJSON = localStorage.getItem("currentUser");
console.log(currentUserJSON);
const currentUserObj = JSON.parse(currentUserJSON)
console.log(currentUserObj);
console.log(currentUserObj.firstName);

// ===> Removing data
localStorage.removeItem("john");

// ===> Clear Data from Local Storage
// localStorage.clear();


console.log("============== Optional Chaining Operator '?.' ==============");
// => it allows you to safely access deeply nested object properties without causing an error if a property is null or undefined

let userObj;
// console.log(userObj.name); // THROWS ERROR
console.log(userObj?.name);  // NO ERROR, logs undefined

