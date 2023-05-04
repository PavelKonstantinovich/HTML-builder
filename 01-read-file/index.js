const fs = require('fs');
const path = require('path');

const text = path.resolve('./01-read-file/text.txt');

try {
  const data = fs.readFileSync(
    text,
    'utf8'
  );
  console.log(data);
} catch (err) {
  console.error(err);
}