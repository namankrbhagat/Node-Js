import fs from 'fs';
import os from 'os';

console.log(os.cpus().length);

console.log("0");

const write = fs.writeFile('./text1.txt' ,"Hey everyone, I'm Naman !!!")
