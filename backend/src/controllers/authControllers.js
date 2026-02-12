// ================= IMPORTS =================

import crypto from "crypto";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";

// ================= HELPER =================

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const cookieExpireDays = Number(process.env.JWT_COOKIE_EXPIRE) || 7;
  const options = {
    expires: new Date(
     Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
};

// ================= REGISTER =================

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(
        new ErrorResponse("Please provide name, email and password", 400),
      );
    }

    let user = await User.findOne({ email });

    // If already verified → block
    if (user && user.isEmailVerified) {
      return next(
        new ErrorResponse("User with this email already exists", 400),
      );
    }

    // If exists but not verified → delete & recreate
    if (user && !user.isEmailVerified) {
      await User.deleteOne({ _id: user._id });
    }

    user = await User.create({
      name,
      email,
      password,
      isEmailVerified: false,
    });

    // Generate verification token
    const verificationToken = user.generateEmailVerificationToken();

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    const message = `
      <h1>Email Verification</h1>
      <p>Hi ${user.name},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "Email Verification",
      html: message,
    });

    await user.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Registration successful! Please verify your email.",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ================= VERIFY EMAIL =================

export const verifyEmail = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid or expired token", 400));
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// ================= RESEND VERIFICATION =================

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No user found with this email", 404));
    }

    if (user.isEmailVerified) {
      return next(new ErrorResponse("Email already verified", 400));
    }

    const verificationToken = user.generateEmailVerificationToken();

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    const message = `
      <h1>Email Verification</h1>
      <p>Hi ${user.name},</p>
      <p>Click below to verify your email:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "Email Verification",
      html: message,
    });

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ================= LOGIN =================

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Email and password required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    if (!user.isEmailVerified) {
      return next(new ErrorResponse("Please verify your email first", 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// ================= FORGOT PASSWORD =================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      html: `
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= RESET PASSWORD =================

export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Password reset successful",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET ME =================

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    },
  });
};
