// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Datastore = require('nedb');

var database;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('create-database', (event, arg) => {
  database = new Datastore({ filename: `${arg}.db`, autoload: true });
  event.reply('create-database-reply', 'BB Creada')
});

ipcMain.on('create-user', (event, arg) => {
  var doc = {
    name: arg.user,
    password: arg.password
  };

  database.insert(doc, function (err, newDoc) {
    if (err)
      event.reply('create-user-reply', 'Error al Crear Usuario');

    if (newDoc._id)
      event.reply('create-user-reply', 'Usuario Creado');
  });
});