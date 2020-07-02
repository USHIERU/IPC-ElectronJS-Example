// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron')

let createDB = document.getElementById("createDataBase");
let createUser = document.getElementById("createUser");

var user = document.getElementById("user");
var password = document.getElementById("password");

// LAUNCH LISTENERS WITH EVENTS
createDB.addEventListener("click", function () {
    ipcRenderer.send('create-database', 'users');
});

createUser.addEventListener("click", function () {
    ipcRenderer.send('create-user', { user: user.value, password: password.value });
    user.value = ""; password.value = "";
});

//OPEN LISTENERS
ipcRenderer.on('create-database-reply', (event, response) => {
    console.log(response);
});

ipcRenderer.on('create-user-reply', (event, response) => {
    console.log(response);
});