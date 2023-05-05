const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = require('process');

const file =  path.resolve('./02-write-file/file.txt');
const text = new fs.WriteStream(file);
const bye =() => {
  stdout.write('Пока\n');
  exit();
};

stdout.write('Введите текст\n');
stdin.on ('data',(e) => {
  if (e.toString().trim() === 'exit') {
    bye();
  } 
  text.write(e);
});
process.on ('SIGINT', bye);