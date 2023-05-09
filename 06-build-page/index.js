const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const copyFolder = path.join(__dirname, 'assets');
const filesFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(filesFolder, 'style.css');
const subFolder = path.join(filesFolder, 'assets');

const deleteFolder = () => fs.rm(filesFolder, {force: true,recursive: true}, () => addFolder());
deleteFolder();
const addFolder = () => fs.mkdir(filesFolder, {recursive: true}, () => fileCreation());

async function cloning(copy,dir){
  await  fs.promises.readdir(copy, {withFileTypes : true}).then (async files => {
    fs.mkdir(dir, {recursive: true}, err=> {if (err) console.log('wtf');});
    files.forEach(async file => {
      if (file.isDirectory()){
        const copyFol = path.join(copy, file.name);
        const subFol = path.join(dir, file.name);
        cloning(copyFol, subFol);
      }
      else{
        await fs.promises.copyFile(path.join(copy, file.name), path.join(dir, file.name));
      }
    });
  });
}

async function gluingFile(){
  const input = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
  const output = fs.createWriteStream(path.join(filesFolder, 'index.html'));
  const components = path.join(__dirname, 'components');
  const transformation = (component) => `{{${component}}}`;
  let str ='';
  input.on('data', data => {
    str += data.toString();
    fs.promises.readdir(components, {withFileTypes : true}).then (async files =>{
      let arr = [];
      files.forEach(async (file, index) => {
        const fileExtension = path.extname(file.name);
        if (fileExtension === '.html'){
          const name = path.parse(file.name).name;
          arr.push(transformation(name));
          const stream = fs.createReadStream(path.join(components, file.name), 'utf-8');      
          stream.on('data', data => {str = str.replace(arr[index], data);
            if(!arr.find(i => str.includes(i))){
              output.write(str);
            }   
          });    
        }
      });
    });
  });
}

const fileCreation = () => fs.unlink(bundleFile, () => fs.writeFile((bundleFile), '', ()=>collector()));

async function collector(){
  const files = await  fs.promises.readdir(stylesFolder, {withFileTypes : true});
  files.forEach(file => {
    const fileExtension = path.extname(file.name);
    if (fileExtension === '.css'){
      const stream = fs.createReadStream(path.join(stylesFolder, file.name));      
      stream.on('data', data => {
        fs.appendFile((bundleFile), data.toString()+'\n', ()=>cloning(copyFolder, subFolder));
      });
    }
  });
  await gluingFile();
}
