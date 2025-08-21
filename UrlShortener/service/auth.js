const jwt = require("jsonwebtoken");
// const sessionIdToUserMap = new Map();
const secret = "Naman$123&%"

function setUser( user) {
  // sessionIdToUserMap.set(id, user);
  return jwt.sign({
    _id: user._id,
    email: user.email,
  }, secret);
}

function getUser(token) {
  // sessionIdToUserMap.get(id);
  if(!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({error: 'Unauthorized'});
  };
}

module.exports = {
  setUser,
  getUser
};