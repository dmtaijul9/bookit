import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/user";
import cloudinary from "cloudinary";

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

export { registerUser, currentUserProfile, updateProfile };
