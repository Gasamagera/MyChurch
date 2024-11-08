const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const Admin = require("./../models/adminModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

createSendTokwen = (admin, statusCode, res) => {
  const token = signToken(admin._id);

  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;
  res.cookie("jwt", token, cookiesOptions);

  admin.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      admin,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newAdmin = await Admin.create({
    names: req.body.names,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendTokwen(newAdmin, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("please provide email and password!", 400));
  }

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError("Incorrect Email or Password", 401));
  }

  createSendTokwen(admin, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentAdmin = await Admin.findById(decoded.id);

  if (!currentAdmin) {
    return next(
      new AppError(
        "The User belonging to this token does not longer exist ",
        401
      )
    );
  }

  if (currentAdmin.changesPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed Password! Please login Again", 401)
    );
  }
  req.user = currentAdmin;

  next();
});
