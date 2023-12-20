const { response } = require("express");
const Users = require("../models/auth.schema");
const productModel = require("../models/product.schema");
require("express-session");
const AuthControler = {
  async home(req, res) {
    if (req.session.login === undefined) {
      res.redirect("/login");
      return false;
    }
    res.render("index", { login: req.session.login });
  },
  register(req, res) {
    if (req.session.login !== undefined) {
      res.redirect("/");
      return false;
    }
    const message =
      req.session.message !== undefined ? req.session.message : "";
    delete req.session.message;

    res.render("register", {
      message: message,
      newUser: { ...req.session.newUser },
    });
  },
  logoutUser(req, res) {
    delete req.session.login;
    res.redirect("/login");
  },
  // login path
  login(req, res) {
    if (req.session.login !== undefined) {
      res.redirect("/");
      return false;
    }
    const message =
      req.session.message !== undefined ? req.session.message : "";
    delete req.session.message;
    res.render("login", {
      message: message,
    });
  },
  async saveRegister(req, res) {
    try {
      var data = req.body;
      if (data.password !== data.cpassword) {
        req.session.message = "password does not match";
        req.session.newUser = { ...data };
        res.redirect("/register");
        return false;
      }
      const isUserExist = await Users.findOne({
        email: { $regex: `^${data.email}$`, $options: "i" },
      });
      if (isUserExist) {
        req.session.message = "email already taken";
        req.session.newUser = { ...data };
        res.redirect("/register");
      } else {
        const user = await Users.create({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        });
        if (user) {
          req.session.message = "Registration sucessfull You can login now";
          req.session.newUser = {};
          res.redirect("login");
        } else {
          req.session.message = "Registration Failed Please Try Again";
          req.session.newUser = { ...data };
          res.redirect("/register");
        }
      }
    } catch (error) {
      req.session.message = "backend error";
      req.session.user = { ...data };
      res.redirect("/register");
    }
  },

  // login user with password
  async loginUser(req, res) {
    try {
      let data = req.body;
      let user = await Users.findOne(
        {
          email: { $regex: `^${data.email}$`, $options: "i" },
          password: data.password,
        },
        { password: 0 }
      );
      if (user) {
        req.session.login = { user };
        res.redirect("/");
      } else {
        req.session.message = "enter vaild username or vaid password";
        res.redirect("/login");
      }
    } catch (error) {
      req.session.message = "backend error";
      res.redirect("/login");
    }
  },
  // ! save new product
  async saveNewProduct(req, res) {
    let { name, Qty, price, mfgDate, id } = req.body;
    try {
      const product = await productModel({
        name,
        Qty,
        price,
        mfgDate,
        id,
      });

      const productSucess = await product.save();
      if (productSucess) {
        res.send({ status: true, message: "product sucessfull add" });
      } else {
        res.send({ status: true, message: "product failed to  add" });
      }
    } catch (error) {
      error.message = "backend error";
    }
  },
  // ? get product form backend to user
  async getProduct(req, res) {
    try {
      if (req.session.login !== undefined) {
        const product = await productModel.find({
          id: req.session.login.user._id,
        });
        res.json({ status: true, result: product });
      } else {
        response.status(401).json({
          status: false,
          message: "Sessiion is expire re-login again",
        });
      }
    } catch (error) {
      error.message = "server error ,try again";
    }
  },

  // ! remove product using id
  async removeProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await productModel.findByIdAndDelete(id);
      if (product) {
        res.send({ status: true, message: "product sucessfull Delete" });
      } else {
        res.send({ status: true, message: "product failed to  Delete" });
      }
    } catch (error) {
      error.message = "backend error";
    }
  },
};

module.exports = AuthControler;
