const { createWorker } = require('tesseract.js');

const worker = createWorker();

(async () => {
               await worker.load();
               await worker.loadLanguage('eng');
               await worker.initialize('eng');
               const { data: { text } } = await worker.recognize('https://assets-global.website-files.com/5f689f82910c6b4f1ffb855b/613b1f91b195318100f7d27e_aadhar%20card%402x-min.jpg');
               console.log(text);
               await worker.terminate();
})();