const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  text: { type: String, required: true },
  username: { type: String, required: false },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Answer", schema);
