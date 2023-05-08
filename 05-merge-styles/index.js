const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname,'styles');
const bundleFile = path.join(__dirname,'./project-dist/bundle.css');

const fileCreation = () => fs.unlink(bundleFile,()=>fs.writeFile((bundleFile),'',()=>collector()));
fileCreation();
async function collector(){
  const files = await  fs.promises.readdir(stylesFolder, {withFileTypes : true});
  files.forEach(file => {
    const fileExtension = path.extname(file.name);
    if (fileExtension === '.css'){
      const stream = fs.createReadStream(path.join(stylesFolder,file.name));      
      stream.on('data', data => {
        fs.appendFile((bundleFile),data.toString()+'\n',()=>console.log('Файл проверен!'));
      });
    }
  });
}
