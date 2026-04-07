// ================= IMPORTS =================
import nodemailer from "nodemailer";

// ================= SEND EMAIL FUNCTION =================
const sendEmail = async (options) => {
  // ================= CREATE TRANSPORTER =================
  const transporter = nodemailer.createTransport({
    // Using host and port is more reliable on Render than the "service" shortcut
    host: "smtp.gmail.com",
    port: 587,
    secure: true, // Use SSL/TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // ✅ 16-character App password
    },
    connectionTimeout: 10000, // 10 seconds
    family: 4, // Force IPv4
  });

  // ================= EMAIL OPTIONS =================
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    html: options.html || options.message,
  };

  // ================= SEND EMAIL =================
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    // We log the error so you can see it in Render logs,
    // but we DO NOT 'throw' it. This prevents the registration
    // from crashing if the email service is down.
    console.error("❌ Email send error:", error.message);

    // Returning false instead of throwing allows your
    // AuthController to finish the user registration.
    return false;
  }
};

export default sendEmail;
