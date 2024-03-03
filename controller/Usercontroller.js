const UserModel = require('../models/user')
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

cloudinary.config({
  cloud_name: "dqipfliu2",
  api_key: "945217929638569",
  api_secret: "FWW81SJYPa_N4TK7uwd4IJQJ7Qs",
});

class Usercontroller {
  static getalluser = async (req, res) => {
    try {
      res.send("hello world");
    } catch (error) {
      console.log(error);
    }
  };
  static userinsert = async (req, res) => {
    try {
      const file = req.files.image;
      // console.log(file);
      // console.log(req.body);

      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profile",
      });

   //   console.log(uploadImage);

      const { name, email, password, confirmpassword } = req.body;
      const user = await UserModel.findOne({ email: email });
      // console.log(user)
      if (user) {
        res.status(401).json({status: "failed" , message:"this email is already exist"})
      } else {
        if (name && email && password && confirmpassword) {
          if (password == confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: uploadImage.public_id,
                url: uploadImage.secure_url,
              },
            });
            const userdata = await result.save();
            // let token = jwt.sign({ ID: user.id }, "skabcsbcksdbcsdvbkdnckdbcs");
            // // console.log(token)
            // res.cookie("token", token);
    
            await result.save();
           res.status(201).json({
            status:"success", message:"Registration Successfully"
           })
          } else {
       res
         .status(401)
         .json({ status: "failed", message: "password and confirm password dose not match" });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "all feilds required" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = Usercontroller