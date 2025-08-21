const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs')

const app = express();
const PORT = 3000;

//Middleware - Encoded
app.use(express.urlencoded({extended : false}))



app.get("/api/users", (req,res)=>{
    return res.json(users);
})

app.get("/api/users/:id" , (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.post("/api/users" , (req,res) => {
    //TODO : Create new user
    const body = req.body;
    users.push(body);
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data) =>{
        return res.json({status : "success",id: users.length + 1 });
    })
    
})
app.patch("/api/users/:id" , (req,res) => {
    //TODO : Edit the user with the id 

    return res.json({status : "pending"})
})
app.delete("/api/users/:id" , (req,res) => {
    //TODO : Delete the user with the id

    return res.json({status : "pending"})
})

// app
//    .route("/api/users/:id")
//    .get((req,res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);
//         return res.json(user); 
//    })
//    .patch((req,res) => {
//         // TODO : Edit the user with the id 
//         return res.json({status : "pending"})
//    })
//    .delete((req,res) =>{
//         //TODO : Delete the user with the id
//         return res.json({status : "pending"})
//    })

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});