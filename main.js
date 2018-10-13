const electron = require('electron');
const ipcMain = electron.ipcMain;
const path = require('path');
const util = require('util');
const fs = require('fs');

const {
    app,
    BrowserWindow
} = require('electron');

// allow fs.stat to use promises
const stat = util.promisify(fs.stat)

let mainWindow;

app.on('ready', () => {
    const htmlPath = path.join('src', 'index.html');
    // create new broswer window
    mainWindow = new BrowserWindow();
    // load html file
    mainWindow.loadFile(htmlPath);
})

// listen for files event by browser process
ipcMain.on('files', async (event, filesArr) => {
    try {
        // asynchronously load data for files
        const data = await Promise.all(
            filesArr.map(async ({
                name,
                pathName
            }) => ({
                ...await stat(pathName),
                name,
                pathName
            }))
        )
        mainWindows.webContents.send('metadata', data)
    } catch (error) {
        mainWindow.webContents.send('metadata:error', error)
    }
})