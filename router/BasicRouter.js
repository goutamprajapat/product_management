const authControler = require("../controller/AuthController");
const basicRouter = require("express").Router();
const { uploadFile } = require("../middleware/product.Middleware");
// add a route to the application
basicRouter.route("/").get(authControler.home);
basicRouter.route("/register").get(authControler.register);
basicRouter.route("/register-user").post(authControler.saveRegister);

basicRouter.route("/login").get(authControler.login);
basicRouter.route("/login-user").post(authControler.loginUser);
basicRouter.route("/logout").get(authControler.logoutUser);

basicRouter
  .route("/api/saveNewproduct")
  .post(uploadFile.single("pic"), authControler.saveNewProduct);

basicRouter.route("/api/getProduct").get(authControler.getProduct);
basicRouter.route("/api/getProduct/:id").get(authControler.getSingleProduct);
basicRouter.route("/api/getProduct/:id").put(authControler.updateProduct);
basicRouter.route("/api/getProduct/:id").delete(authControler.removeProduct);
module.exports = basicRouter;
