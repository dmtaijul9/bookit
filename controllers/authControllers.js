import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/user";
import cloudinary from "cloudinary";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

//Config Coudinary setting

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Register a new user => /api/auth/register

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { email, name, password, avatar } = req.body;

  const uploadedAvatar = await cloudinary.v2.uploader.upload(avatar, {
    folder: "bookit/avatar",
    width: "150",
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: uploadedAvatar.public_id,
      url: uploadedAvatar.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Account registered successfully",
  });
});

//Current user profile  => /api/me

const currentUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update user profile  => /api/me/update

const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const { name, email, avatar, password } = req.body;

  if (user) {
    user.name = name;
    user.email = email;

    if (password) user.password = password;
  }

  // Update avatar
  if (avatar !== "") {
    const image_id = user.avatar.public_id;
    // Delete user previus image/avatar

    await cloudinary.v2.uploader.destroy(image_id);

    const uploadedAvatar = await cloudinary.v2.uploader.upload(avatar, {
      folder: "bookit/avatar",
      width: "150",
      crop: "scale",
    });

    user.avatar = {
      public_id: uploadedAvatar.public_id,
      url: uploadedAvatar.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

//Forgot password  => /api/password/forgot

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // get reset token

  const resetToken = user.getResetPasswordToken();

  //save reset token and expriry in database

  await user.save({ validateBeforeSave: false });

  // get origin

  const { origin } = absoluteUrl(req);

  // Generate reset url

  const resetUrl = `${origin}/password/reset/${resetToken}`;
  const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email,
      subject: "BookIT Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password  => /api/password/reset/:token

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.query;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    // ResetPasswordExpiry may be wrong call according to videos . but in my case it is working fine
    resetPasswordExpiry: {
      $gt: Date.now(), // $gt means greater then ....
    },
  });
  console.log("reset token", user);

  if (!user) {
    return next(
      new ErrorHandler("Invalid reset token or token has been expired.", 404)
    );
  }

  // check both password is same

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match!", 404));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  //save  in database

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
export {
  registerUser,
  currentUserProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
};
