const fs = require('fs');
const filesToRead = process.argv.slice(2);
const filesArr = [];
for (let k = 0; k < filesToRead.length; k++) {
  filesArr.push(null);
}

const fileReaderQueue = index => {
  fs.readFile(filesToRead[index], 'utf8', (err, data) => {
    if (err) throw err;
    filesArr[index] = data;
    if (index < filesToRead.length - 1) {
      index++;
      fileReaderQueue(index);
    }
    if (index === filesToRead.length - 1 && filesArr[index] !== null) {
      filesArr.forEach(txtFile => {
        console.log(txtFile);
      });
    }

  });
};

fileReaderQueue(0);
