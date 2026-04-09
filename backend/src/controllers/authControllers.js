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
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
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

// ================= VERIFY EMAIL =================

// export const verifyEmail = async (req, res, next) => {
//   try {
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     const user = await User.findOne({
//       emailVerificationToken: hashedToken,
//       emailVerificationExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return next(new ErrorResponse("Invalid or expired token", 400));
//     }

//     user.isEmailVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationExpire = undefined;

//     await user.save();

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     next(error);
//   }
// };
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    console.log("📧 Received token:", token);

    // Hash the token from URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    console.log("🔐 Hashed token:", hashedToken);

    // Find user
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() },
    });

    console.log("👤 User found:", user ? "YES" : "NO");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    console.log("✅ Email verified successfully");

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      data: {
        isEmailVerified: true,
      },
    });
  } catch (error) {
    console.error("❌ Verification error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= RESEND VERIFICATION =================

// export const resendVerificationEmail = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return next(new ErrorResponse("No user found with this email", 404));
//     }

//     if (user.isEmailVerified) {
//       return next(new ErrorResponse("Email already verified", 400));
//     }

//     const verificationToken = user.generateEmailVerificationToken();

//     const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

//     const message = `
//       <h1>Email Verification</h1>
//       <p>Hi ${user.name},</p>
//       <p>Click below to verify your email:</p>
//       <a href="${verificationUrl}">Verify Email</a>
//       <p>This link will expire in 24 hours.</p>
//     `;

//     await sendEmail({
//       email: user.email,
//       subject: "Email Verification",
//       html: message,
//     });

//     await user.save({ validateBeforeSave: false });

//     res.status(200).json({
//       success: true,
//       message: "Verification email sent successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

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

    // Generate new token
    const verificationToken = user.generateEmailVerificationToken();

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    const message = `
      <h1>Email Verification</h1>
      <p>Hello ${user.name},</p>
      <p>Please verify your email by clicking the button below:</p>

      <a href="${verificationUrl}" 
      style="display:inline-block;padding:10px 20px;background:#4F46E5;color:#fff;text-decoration:none;border-radius:5px;">
        Verify Email
      </a>

      <p>This link will expire in 24 hours.</p>
      <p>If you did not request this email, please ignore it.</p>
    `;

    // Save token first
    await user.save({ validateBeforeSave: false });

    try {
      await sendEmail({
        email: user.email,
        subject: "Verify Your Email",
        html: message,
      });

      res.status(200).json({
        success: true,
        message: "Verification email sent successfully",
      });
    } catch (err) {
      // Remove token if email fails
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    console.log("🔑 Forgot password request for:", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Please provide an email address",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      // Don't reveal if user exists
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset link has been sent",
      });
    }

    console.log("✅ User found, generating reset token...");

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    console.log("✅ Reset token saved to database");

    // Create reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log('\n========================================');
    console.log('🔗 PASSWORD RESET LINK:');
    console.log(resetUrl);
    console.log('========================================\n');

    // Try to send email
    const message = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #3b82f6; margin-bottom: 20px;">Password Reset Request</h1>
        <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
          You requested a password reset for your Progressly account.
        </p>
        <p style="font-size: 16px; color: #374151; margin-bottom: 30px;">
          Click the button below to reset your password:
        </p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 14px 28px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-bottom: 30px;">
          Reset Password
        </a>
        <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">
          Or copy and paste this link in your browser:
        </p>
        <p style="font-size: 14px; color: #3b82f6; word-break: break-all; margin-bottom: 30px;">
          ${resetUrl}
        </p>
        <p style="font-size: 14px; color: #ef4444; font-weight: 600; margin-bottom: 20px;">
          ⚠️ This link will expire in 10 minutes.
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          If you didn't request this, please ignore this email and your password will remain unchanged.
        </p>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request - Progressly",
        html: message,
      });

      console.log("✅ Email sent successfully");

      res.status(200).json({
        success: true,
        message: "Password reset email sent! Check your inbox.",
      });
    } catch (emailError) {
      console.error("❌ Email send failed:", emailError.message);

      // For development - return link in response
      if (process.env.NODE_ENV === 'development') {
        console.log("📧 Email service unavailable - sending link in response");
        return res.status(200).json({
          success: true,
          message: "Email service unavailable. Use the link below:",
          resetUrl: resetUrl,
        });
      }

      // Production - delete token and return error
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        error: "Email could not be sent. Please try again later.",
      });
    }
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    next(error);
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    console.log("🔑 Reset password attempt with token:", token.substring(0, 10) + "...");

    if (!password) {
      return res.status(400).json({
        success: false,
        error: "Please provide a new password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters long",
      });
    }

    // Hash the token from URL
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    console.log("🔐 Looking for user with hashed token...");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log("❌ Invalid or expired token");
      return res.status(400).json({
        success: false,
        error: "Invalid or expired reset token",
      });
    }

    console.log("✅ User found, updating password...");

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    console.log("✅ Password reset successful");

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now login with your new password.",
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    next(error);
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

// ================= REGISTER =================
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
      isEmailVerified: false,
    });

    // Generate verification token
    const verificationToken = user.generateEmailVerificationToken();

    // Save token
    await user.save({ validateBeforeSave: false });

    // Create verification URL
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    const message = `
      <h1>Email Verification</h1>
      <p>Hello ${user.name}</p>
      <p>Click below to verify your email:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `;

    // Send email
    await sendEmail({
      email: user.email,
      subject: "Verify your email",
      html: message,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. Check your email.",
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt for:", email);

    if (!email || !password) {
      return next(new ErrorResponse("Email and password required", 400));
    }

    // 1️⃣ Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("User not found");
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    console.log("User found, checking password...");

    // 2️⃣ Check password
    const isPasswordCorrect = await user.comparePassword(password);

    console.log("Password match:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      console.log("Password incorrect");
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // 3️⃣ Check email verification
    if (!user.isEmailVerified) {
      return next(
        new ErrorResponse("Please verify your email before logging in", 403),
      );
    }

    console.log("Login successful!");

    // 4️⃣ Send token
    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};
