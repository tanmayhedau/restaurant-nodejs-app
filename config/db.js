const mongoose = require('mongoose');
const colors = require('colors');

module.exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`.bgMagenta);
  } catch (error) {
    console.log(`DB error`, error);
  }
};