import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// ================= USER SCHEMA =================

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ================= EMAIL VERIFICATION =================

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
      select: false,
    },

    emailVerificationExpire: {
      type: Date,
      select: false,
    },

    // ================= PASSWORD RESET =================

    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpire: {
      type: Date,
      select: false,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// ================= PASSWORD HASHING MIDDLEWARE =================
// ✅ FIXED: Removed 'next' parameter (modern async/await style)

UserSchema.pre("save", async function () {
  // Only hash if password is modified
  if (!this.isModified("password")) {
    return;
  }

  // Hash password with bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ================= INSTANCE METHODS =================

// Generate JWT token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    },
  );
};

// Compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
UserSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Generate email verification token
// UserSchema.methods.generateEmailVerificationToken = function () {
//   const verificationToken = crypto.randomBytes(32).toString("hex");

//   this.emailVerificationToken = crypto
//     .createHash("sha256")
//     .update(verificationToken)
//     .digest("hex");

//   this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;

//   return verificationToken;
// };
UserSchema.methods.generateEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;

  return verificationToken;
};

// ================= SECURITY =================

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// ================= EXPORT MODEL =================

export default mongoose.model("User", UserSchema);