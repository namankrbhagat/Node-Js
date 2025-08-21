const express = require('express');
const {connectMongoDB} = require('./connections')
const userRouter = require('./routes/users')
const {} = require('./middlewares')

const app = express();
const PORT = 3000;

// connect mongoose and MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/my-app-1")

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));


app.use("/user" , userRouter)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});