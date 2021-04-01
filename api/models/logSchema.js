const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
// Format for Mongodb Database
const logSchema = new mongoose.Schema({
  hostname: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }/* ,
  createdAt: {
    type: Date,
    expires: "20160m",
    default: Date.now,
    required: false,
  }, */
}, { timestamps: true });

const logs = mongoose.model("logs", logSchema);
module.exports = logs;