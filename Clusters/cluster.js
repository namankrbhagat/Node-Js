import cluster from 'cluster'
import os from 'os'
import express from 'express'

const totalCPUs = os.cpus().length;

console.log(totalCPUs);

if(cluster.isPrimary){
  for (let index = 0; index < totalCPUs; index++) {
    cluster.fork();
  }
}else{
  const app = express();
  const PORT = 1000;

  app.get("/",(req,res) => {
    return res.json({message: `Hello from Express Server ${process.pid} 🚀`})
  })

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  })
}