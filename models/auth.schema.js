const mongoose = require("mongoose");

// create a user schema
const userschema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  cpassword: { type: String },
  phone: { type: String },
});

const Users = mongoose.model("user", userschema, "users");

// export user schema
module.exports = Users;
