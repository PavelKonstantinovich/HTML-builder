const fs = require('fs');
const path = require('path');

const text = path.resolve('./01-read-file/text.txt');
const stream = new fs.ReadStream(text, {encoding: 'utf-8'});

stream.on('data', (text) => console.log(text));