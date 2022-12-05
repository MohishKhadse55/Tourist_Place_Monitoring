const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOLIE_EXPIRES_IN * 24 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
  // Remove the password field
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please Provide the email and password", 400));
  }

  // check if the user exist and password is corect
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  console.log(await user.correctPassword(password, user.password));

  if (!user || !(await user.correctPassword(password, user.password))) {
    // console.log("Incorrect email or password");
  }

  createSendToken(user, 200, res);
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render("login", { title: "Log in to your account" });
};

exports.getSignupForm = (req, res, next) => {
  res.status(200).render("signup", { title: "Log in to your account" });
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      console.log("cookie exist");
      // token = req.cookies.jwt;

      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 3) Check if the user is still exist
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        return next();
      }
      // // 4 check if the user changed the password after the token was issued
      // if (freshUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }

      // Granted access to the protected route
      res.locals.user = freshUser;

      return next();
    }
  } catch (error) {
    return next();
  }
  next();
};
