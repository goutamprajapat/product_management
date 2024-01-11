const authControler = require("../controller/AuthController");
const basicRouter = require("express").Router();
const { uploadFile, noUpload } = require("../middleware/product.Middleware");
const { schemaAuthValidate } = require("../middleware/schemaAuth.validate");
// add a route to the application
basicRouter.route("/").get(authControler.home);
basicRouter.route("/register").get(authControler.register);
basicRouter.route("/register-user").post(authControler.saveRegister);

basicRouter.route("/login").get(authControler.login);
basicRouter.route("/login-user").post(authControler.loginUser);
// basicRouter
//   .route("/api-login-user")
//   .post(schemaAuthValidate, authControler.loginApiUser);

basicRouter.route("/logout").get(authControler.logoutUser);

basicRouter
  .route("/api/saveNewproduct")
  .post(uploadFile.single("pic"), authControler.saveNewProduct);

basicRouter.route("/api/getProduct").get(authControler.getProduct);
basicRouter.route("/api/getProduct/:id").get(authControler.getSingleProduct);
basicRouter
  .route("/api/getProductUpdate/:id")
  .put(uploadFile.single("pic"), authControler.updateProduct);
basicRouter.route("/api/getProduct/:id").delete(authControler.removeProduct);
module.exports = basicRouter;
