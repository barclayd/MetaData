const {
    ipcRenderer
} = require('electron');
const util = require('util');
const fs = require('fs');

// listen for form to be submitted by user

const submitListener = document
    .querySelector('form')
    .addEventListener('submit', (event) => {
        // prevent default behaviour that causes the page to refresh
        event.preventDefault();

        const files = [...document.getElementById('filePicker').files];
        //     console.log(files)
        // })
        const filesFormatted = files.map(({
            name,
            path: pathName
        }) => ({
            name,
            pathName
        }))

        // send data to the main process
        ipcRenderer.send('files', filesFormatted);
    })

// analyse metadata from main prcoess
ipcRenderer.on('metadata', (event, metadata) => {
    const pre = document.getElementById('data')

    pre.innerText = JSON.stringify(metadata, null, 2)
})

// error handler from catch block in main process
ipcRenderer.on('metadata:error', (event, error) => {
    console.log(error);
})