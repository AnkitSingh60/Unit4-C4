const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, "../uploads"))
    },
    filename: function (req, file, callback) {
      const uniquePerfix = Date.now() + Math.round(Math.random() * 1E9)
      callback(null,`${uniquePerfix} Code_By_Ankit ${file.originalname}`)
    }
  })

  function fileFilter (req, file, callback) {

    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        callback(null, true)
    } else {
        callback(null, false)
    }
  }
const upload = multer({ storage, fileFilter, limits:{
    fieldSize: 1024 * 1024 * 5
},
})
module.exports = upload;
