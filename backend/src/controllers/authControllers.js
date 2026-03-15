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

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     const resetToken = user.generatePasswordResetToken();
//     await user.save({ validateBeforeSave: false });

//     const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//     await sendEmail({
//       email: user.email,
//       subject: "Password Reset",
//       html: `
//         <p>Click the link below to reset your password:</p>
//         <a href="${resetUrl}">Reset Password</a>
//       `,
//     });

//     res
//       .status(200)
//       .json({ success: true, message: "Password reset email sent" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorResponse("Please provide an email", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset link has been sent",
      });
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log("\n========================================");
    console.log("🔗 PASSWORD RESET LINK (COPY THIS):");
    console.log(resetUrl);
    console.log("========================================\n");

    // Try to send email
    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset - Progressly",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6;">Password Reset Request</h1>
            <p>You requested a password reset for your Progressly account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">
              Reset Password
            </a>
            <p>Or copy and paste this link in your browser:</p>
            <p style="color: #6b7280; word-break: break-all;">${resetUrl}</p>
            <p style="color: #ef4444; font-weight: bold;">This link will expire in 10 minutes.</p>
            <p style="color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });

      res.status(200).json({
        success: true,
        message: "Password reset email sent! Check your inbox.",
      });
    } catch (emailError) {
      console.error("❌ Email send failed:", emailError.message);

      // Don't delete token - still allow reset via console link
      // user.resetPasswordToken = undefined;
      // user.resetPasswordExpire = undefined;
      // await user.save({ validateBeforeSave: false });

      // For development - still return success and user can use console link
      if (process.env.NODE_ENV === "development") {
        return res.status(200).json({
          success: true,
          message: "Email service unavailable. Reset link logged to console.",
          devLink: resetUrl, // Send link in response for dev
        });
      }

      return next(
        new ErrorResponse(
          "Email could not be sent. Please try again later.",
          500,
        ),
      );
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    next(error);
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

// ================= REGISTER =================
// export const register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return next(
//         new ErrorResponse("Please provide name, email and password", 400),
//       );
//     }

//     let user = await User.findOne({ email });

//     if (user) {
//       return next(
//         new ErrorResponse("User with this email already exists", 400),
//       );
//     }

//     user = await User.create({
//       name,
//       email,
//       password,
//       isEmailVerified: false,
//     });

//     const verificationToken = user.generateEmailVerificationToken();

//     const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

//     const message = `
//       <h1>Email Verification</h1>
//       <p>Hello ${user.name},</p>
//       <p>Please verify your email by clicking the link below:</p>
//       <a href="${verificationUrl}">Verify Email</a>
//       <p>This link will expire in 24 hours.</p>
//     `;

//     await sendEmail({
//       email: user.email,
//       subject: "Verify your email",
//       html: message,
//     });

//     await user.save({ validateBeforeSave: false });

//     res.status(201).json({
//       success: true,
//       message: "Registration successful. Please check your email to verify.",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorResponse("User already exists", 400));
    }

    user = await User.create({
      name,
      email,
      password,
      isEmailVerified: false,
    });

    // Generate verification token
    const verificationToken = user.generateEmailVerificationToken();

    // Save token to DB
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    await sendEmail({
      email: user.email,
      subject: "Verify your email",
      html: `
        <h1>Email Verification</h1>
        <p>Hello ${user.name}</p>
        <p>Click below to verify:</p>
        <a href="${verificationUrl}">Verify Email</a>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Please check your email to verify your account",
    });
  } catch (error) {
    next(error);
  }
};

// ================= LOGIN =================
// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     console.log("Login attempt for:", email); // Debug

//     if (!email || !password) {
//       return next(new ErrorResponse("Email and password required", 400));
//     }

//     if (!user.isEmailVerified) {
//       return next(
//         new ErrorResponse("Please verify your email before logging in", 403),
//       );
//     }

//     sendTokenResponse(user, 200, res);

//     // Find user with password field
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       console.log("User not found"); // Debug
//       return next(new ErrorResponse("Invalid credentials", 401));
//     }

//     console.log("User found, checking password..."); // Debug

//     // Check password
//     const isPasswordCorrect = await user.comparePassword(password);

//     console.log("Password match:", isPasswordCorrect); // Debug

//     if (!isPasswordCorrect) {
//       console.log("Password incorrect"); // Debug
//       return next(new ErrorResponse("Invalid credentials", 401));
//     }

//     // Skip email verification check for now
//     console.log("Login successful!"); // Debug

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     console.error("Login error:", error);
//     next(error);
//   }
// };
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
