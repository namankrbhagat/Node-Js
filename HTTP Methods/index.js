import http from 'http';
import fs from 'fs';
import url from 'url';


const myServer = http.createServer((req, res) => {
  if(req.url === '/favicon.ico') return res.end();

  const log = `${Date.now()}: ${req.url} New Req Received\n`;
  const myUrl = url.parse(req.url,true);

  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname){
      case '/':
        res.end("HomePage");
        break;
      case '/about':
        const username = myUrl.query.myname
        res.end(`Hey, My name is, ${username}`);
        break;
      case '/search':
        const search = myUrl.query.search_query
        res.end("Here are your results for " + search);
        break;
      case '/signup':
        if (req.method === "GET")  res.end("this is a signup form");
        if (req.method === "POST") res.end("signup successfully");
        break;
      default :
        res.end("404 Not Found!!")
    }
  })
})

myServer.listen(8000, () => console.log('Server started!!'));