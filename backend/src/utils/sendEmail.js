// ================= IMPORTS =================
import nodemailer from "nodemailer";

// ================= SEND EMAIL FUNCTION =================
const sendEmail = async (options) => {
  // ================= CREATE TRANSPORTER =================
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // ✅ App password
    },
  });

  // ================= EMAIL OPTIONS =================
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.html || options.message,
  };

  // ================= SEND EMAIL =================
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email send error:", error);
    console.log(error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
