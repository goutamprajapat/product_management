const express = require("express");
require("pug");
const app = express();
const mongoose = require("mongoose");
const basicRouter = require("./router/BasicRouter");
const session = require("express-session");
const URI = "mongodb://127.0.0.1:27017/project_mang";
const port = 3031;
// to access json data call
app.use(express.json());
// encode another formate data
app.use(express.urlencoded({ extended: false }));

// set template engine defaults
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("./public"));
app.set("trust proxy", 1);
// use session instead
app.use(
  session({
    secret: "GOUTAMPRJAPT123",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", basicRouter);

// connect mongodb to server
mongoose
  .connect(URI)
  .then(() => {
    console.log("sucessfully conndect to db");
    // listion server on port 3031
    app.listen(port, () =>
      console.log(` app listening on port http://localhost:${port}`)
    );
  })
  .catch((err) => err.exit(1));
