const express = require('express');
const path = require('path');
const {connectMongoDB} = require('./connect');
const URL = require('./models/url')
const urlRoute = require('./routes/route');
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const {checkForAuth,restrictTo} = require('./middlewares/auth');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3001;
const url = "mongodb://127.0.0.1:27017/url-shorter";

connectMongoDB(url, (err, db) => {
    if (err) {
        console.error(err);
    }
}).then(() => {
    console.log("Connected to MongoDB");
})

app.set("view engine","ejs");
app.set('views',path.resolve("./views"))


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(checkForAuth);

app.use("/url",restrictTo(["NORMAL"]), urlRoute)
app.use('/',staticRoute)
app.use('/user',userRoute)


app.get("/test", async (req,res) => {
  const allUrls = await URL.find({})
  res.render("home", {
    urls :allUrls,
    
  })
});


app.get('/url/:shortId', async(req,res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  },
  {
    $push:{
      visitHistory: {
        timeStamp: Date.now()
      },
    }
  });
  res.redirect(entry.redirectUrl)
})




app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
})