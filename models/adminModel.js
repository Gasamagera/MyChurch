const mongoose = require("mongoose");
const validator = require("validator");
const bcyrpt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  names: {
    type: String,
    required: [true, "Admin must have Names"],
    trim: true,
    maxlength: [50, "A Admin must have less or equal 50 characters"],
  },
  photo: [String],

  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
    required: [true, "Admin must have an Email"],
  },
  password: {
    type: String,
    required: [true, "Admin must have a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Admin must have a password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "password are not matched",
    },
  },
  passwordChangedAt: Date,
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcyrpt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcyrpt.compare(candidatePassword, userPassword);
};

adminSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
