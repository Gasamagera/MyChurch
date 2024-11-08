const mongoose = require("mongoose");
const validator = require("validator");

const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A Member must have a firstname"],
    trim: true,
    maxlength: [50, "A Member must have less or equal 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "A Member must have a lastname"],
    trim: true,
    maxlength: [100, "A Member must have less or equal 100 characters"],
  },
  age: {
    type: Number,
    required: [true, "A member must have Age"],
  },
  country: {
    type: String,
    required: [true, "A member must have a country"],
  },
  province: {
    type: String,
    required: [true, "A member must have a province"],
  },
  sector: {
    type: String,
    required: [true, "A member must have a sector"],
  },
  cell: {
    type: String,
    required: [true, "A member must have a cell"],
  },
  village: {
    type: String,
    required: [true, "A member must have a village"],
  },
  photo: [String],
  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "separated", "divorced", "widowed"],
    required: [true, "A member must have status"],
  },
  occupation: {
    type: String,
    required: [true, "A member must have occupation"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
    required: [true, "A member must have an Email"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    validate: {
      validator: function (val) {
        return validator.isMobilePhone(val, "any");
      },
      message: "Please provide a valid phone number",
    },
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
