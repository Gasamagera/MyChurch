const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
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
  passwordResetToken: String,
  passwordResetExpires: Date,
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcyrpt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

adminSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
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

adminSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
