import http from 'http';
import fs from 'fs';


const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url){
      case '/':
        res.end("HomePage");
        break;
      case '/about':
        res.end("I'm Naman Kumar Bhagat");
        break;
      default :
        res.end("404 Not Found!!")
    }

    
  })
})

myServer.listen(8000, () => console.log('Server started!!'));