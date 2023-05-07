const fs = require('fs');
const path = require('path');

const copyFolder = path.join(__dirname,'files');
const filesFolder =path.join(__dirname,'files-copy');

const deleteFolder = ()=> fs.rm(filesFolder,{force: true,recursive: true},() =>cloning());
deleteFolder();
async function cloning(){
  await  fs.promises.readdir(copyFolder).then (files =>{
    fs.mkdir(filesFolder,{recursive: true},() => console.log('Директория создана!'));
    files.forEach(file => {
      fs.promises.copyFile(path.join(copyFolder,file),path.join(filesFolder,file));
    });
  });
}
