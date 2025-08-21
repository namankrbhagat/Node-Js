const { use } = require('react');
const {getUser} = require('../service/auth')
function checkForAuth(req,res,next){

  
  const authorizationHeaderValue = req.headers["Authorization"];
  req.user = null;
  if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
    return next();
  }

  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user

  return next();
}

function restrictTo(roles = []){
  return function(req,res,next){
    if(!req.user){
      return res.redirect("/login");
    }

    if(!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  }
}

module.exports = {checkForAuth,restrictTo};