import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

//create user data model

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
      unique: true, // Prevent duplicate accounts
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
      select: false, // Exclude password from query results
    },

    role: {
      type: String,
      enum: ["user", "admin"], // Allowed roles
      default: "user",
    }, // ========== EMAIL VERIFICATION FIELDS ==========
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

    // ========== PASSWORD RESET FIELDS ==========
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    }, 

    // Used for password reset feature
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  },
);

// ================= PASSWORD HASHING MIDDLEWARE =================
//
// Hashes password before saving user
// Runs only when password is created or updated

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return ;
  }

  // const salt =  bcrypt.getSalt(10); giving error as not a function in bcryptjs
  this.password = await bcrypt.hash(this.password, 10);
});

// ================= INSTANCE METHODS =================

// Generate JWT token for authentication

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id }, // Token payload (user identifier)
    process.env.JWT_SECRET, // Secret key
    { expiresIn: process.env.JWT_EXPIRE }, // Token expiry time
  );
};

// Compare entered password with hashed password in database
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token and expiry time
UserSchema.methods.generatePasswordResetToken = function () {
  // Create random reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token before saving to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token expires in 10 minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  // Return raw token to send via email
  return resetToken;
};

UserSchema.methods.generateEmailVerificationToken = function() {
  // Generate random token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token and save to database
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  // Set expiry (24 hours)
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;
  
  return verificationToken; // Return unhashed token (sent via email)
};

// ================= EXPORT MODEL =================

// Export User model to be used across the app
export default mongoose.model("User", UserSchema);
