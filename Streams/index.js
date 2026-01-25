import express from 'express'
import zlib from 'zlib'
import fs from 'fs'
import status from 'express-status-monitor'

const app = express()

const PORT = 1000
app.use(status())

fs.createReadStream("Main.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("Main.txt"))
)

app.get("/", (req,res) => {
  const stream = fs.createReadStream("Main.txt","utf-8");
  stream.on('data',(chunk) => {
    res.write(chunk);
    stream.on("end", () => res.end());
  })
})

app.listen(PORT,() => {
  console.log(`Server started at PORT: ${PORT}`);
})
