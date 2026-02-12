// ================= EMAIL TEMPLATES =================
// This file contains reusable HTML templates for emails
// Used for verification, password reset, and success messages


/**
 * EMAIL VERIFICATION TEMPLATE
 * Creates the email sent after user registers
 * @param {String} name - User's name
 * @param {String} verificationUrl - Link to verify email
 */
const emailVerificationTemplate = (name, verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Basic email styling */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Top banner */
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }

        /* Main email body */
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }

        /* Button style */
        .button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }

        /* Footer text */
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>

      <!-- Email Header -->
      <div class="header">
        <h1>Welcome to ProgressTrack! 🎉</h1>
      </div>

      <!-- Email Content -->
      <div class="content">
        <p>Hi ${name},</p>
        <p>Thanks for signing up!</p>

        <!-- Verification button -->
        <div style="text-align: center;">
          <a href="${verificationUrl}" class="button">Verify Email Address</a>
        </div>

        <!-- Backup link -->
        <p>Or copy this link:</p>
        <p style="word-break: break-all;">${verificationUrl}</p>

        <p>This link expires in 24 hours.</p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>ProgressTrack</p>
      </div>

    </body>
    </html>
  `;
};


/**
 * PASSWORD RESET TEMPLATE
 * Creates the email when user forgets password
 * @param {String} name - User's name
 * @param {String} resetUrl - Password reset link
 */
const passwordResetTemplate = (name, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Same layout styling as other emails */
        body {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }

        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }

        .content {
          background: #f9f9f9;
          padding: 30px;
        }

        .button {
          background: #667eea;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
        }

        /* Warning box */
        .warning {
          background: #fff3cd;
          padding: 15px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>

      <!-- Email Header -->
      <div class="header">
        <h1>Reset Your Password 🔒</h1>
      </div>

      <!-- Email Content -->
      <div class="content">
        <p>Hi ${name},</p>

        <!-- Reset button -->
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button">Reset Password</a>
        </div>

        <!-- Security info -->
        <div class="warning">
          This link expires in 1 hour.<br>
          Ignore this email if you didn’t request it.
        </div>
      </div>

    </body>
    </html>
  `;
};


/**
 * EMAIL VERIFIED SUCCESS TEMPLATE
 * Sent after user successfully verifies email
 * @param {String} name - User's name
 */
const emailVerifiedTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }

        .header {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }

        .content {
          background: #f9f9f9;
          padding: 30px;
        }
      </style>
    </head>
    <body>

      <!-- Success Header -->
      <div class="header">
        <h1>Email Verified! ✅</h1>
      </div>

      <!-- Success Message -->
      <div class="content">
        <p>Hi ${name},</p>
        <p>Your email is verified. You can now use all features.</p>
      </div>

    </body>
    </html>
  `;
};


// ================= EXPORTS =================
// Export templates to use inside controllers
export {
  emailVerificationTemplate,
  passwordResetTemplate,
  emailVerifiedTemplate,
};
