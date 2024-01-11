const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);

    // let file = file.originalname;
    // let arr = file.split(".");
    // let ext = arr[arr.length - 1];
    // let file = file.originalname;
    let pos = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(pos);
    let filename = Date.now() + ext;
    cb(null, filename);
  },
});
const uploadFile = multer({ storage: storage });
const noUpload = multer();
module.exports = { uploadFile, noUpload };
