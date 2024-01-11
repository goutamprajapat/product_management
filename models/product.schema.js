const { Schema, model, default: mongoose } = require("mongoose");

// creat a product schema for the given model
const userschema = new Schema({
  name: { type: String },
  Qty: { type: Number },
  price: { type: Number },
  mfgDate: { type: String },
  id: { type: mongoose.Schema.Types.ObjectId },
  images: { type: String },
});

const productModel = model("product", userschema, "products");

module.exports = productModel;
