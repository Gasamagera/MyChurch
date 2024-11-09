const mongoose = require("mongoose");
const validator = require("validator");
const Country = require("./countryModel");
const Occupation = require("./occupationModel");

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
    type: mongoose.Schema.ObjectId,
    ref: "Country",
    required: [true, "Country must belong to a Member"],
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
    type: mongoose.Schema.ObjectId,
    ref: "Occupation",
    required: [true, "Occupation Must Belong To  a Member"],
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

memberSchema.pre("/find", function (next) {
  this.populate({
    path: "country",
    select: "name code",
  }).populate({
    path: "occupation",
    select: "title duration description",
  });
  next();
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
