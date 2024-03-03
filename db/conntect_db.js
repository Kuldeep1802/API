const mongoose = require("mongoose");

const connect_db = () => {
  return mongoose.connect(process.env.LIVE_URL)

    .then(() => {
      console.log("MONGO_DB IS CONNECTED BY localhost:1000");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connect_db;
