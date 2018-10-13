const path = require('path');

const {
    app,
    BrowserWindow
} = require('electron');

let mainWindow;

app.on('ready', () => {
    const htmlPath = path.join('src', 'index.html');
    // create new broswer window
    mainWindow = new BrowserWindow();
    // load html file
    mainWindow.loadFile(htmlPath);
})