const submitListener = document
    .querySelector('form')
    .addEventListener('submit', (event) => {
        // prevent default behaviour that causes the page to refresh
        event.preventDefault();

        const files = document.getElementById('filePicker').files;
        console.log(files);
    })