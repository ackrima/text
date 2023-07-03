const mongoose = require("mongoose"); 

const connect = () => {
  mongoose
    .connect("mongodb://0.0.0.0:27017/text") 
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;