const authControler = require("../controller/AuthController");
const multer = require("multer");
const mult = multer();
const basicRouter = require("express").Router();

// add a route to the application
basicRouter.route("/").get(authControler.home);
basicRouter.route("/register").get(authControler.register);
basicRouter.route("/register-user").post(authControler.saveRegister);

basicRouter.route("/login").get(authControler.login);
basicRouter.route("/login-user").post(authControler.loginUser);
basicRouter.route("/logout").get(authControler.logoutUser);

basicRouter
  .route("/api/saveNewproduct")
  .post(mult.none(), authControler.saveNewProduct);

basicRouter.route("/api/getProduct").get(authControler.getProduct);
basicRouter.route("/api/getProduct/:id").delete(authControler.removeProduct);
module.exports = basicRouter;
