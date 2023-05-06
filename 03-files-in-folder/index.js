const fs = require('fs');
const path = require('path');

const folder = path.resolve('03-files-in-folder/secret-folder');

async function enumeration(){
  const files = await  fs.promises.readdir(folder, {withFileTypes : true});
  files.forEach(file => {
    if (!file.isDirectory()){
      const fileName = path.parse(file.name).name;
      const fileExtension = path.extname(file.name).replace('.', '');
      fs.promises.stat(path.join(folder, file.name)).then(stats => {
        const fileWeight = stats.size;
        console.log(fileName + ' - ' + fileExtension + ' - ' + fileWeight + ' byte');
      });
    }
  });
}
enumeration();
