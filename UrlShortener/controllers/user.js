const User = require("../models/user") 
// const {v4:uuidv4} = require('uuid')
const {setUser} = require('../service/auth')

async function handleUserSignup(req,res) {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.render("signup", {
      error: "All fields (name, email, password) are required"
    });
  }

  try {
    await User.create({
      name,
      email,
      password,
    });

    return res.redirect("/");
  } catch (error) {
    // Handle validation errors or duplicate email
    if (error.name === 'ValidationError') {
      return res.render("signup", {
        error: "Please fill in all required fields correctly"
      });
    } else if (error.code === 11000) {
      return res.render("signup", {
        error: "Email already exists"
      });
    } else {
      return res.render("signup", {
        error: "An error occurred during signup"
      });
    }
  }
}

async function handleUserLogin(req,res) {
  const { email, password } = req.body;
  const user = await User.findOne({email, password})
  if(!user) return res.render("login", {
    error: "Invalid Username or Password",
  })

  // const sessionId = uuidv4();

  const token = setUser(user)
  return res.json({token});
}

module.exports = {handleUserSignup,handleUserLogin};
