const express = require("express");
const Usercontroller = require("../controller/Usercontroller");
const route = express.Router();

route.get("/getalluser", Usercontroller.getalluser);
route.post("/userinsert", Usercontroller.userinsert);

module.exports = route;
