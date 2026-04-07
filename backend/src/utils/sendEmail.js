// // ================= IMPORTS =================
// import nodemailer from "nodemailer";

// // ================= SEND EMAIL FUNCTION =================
// const sendEmail = async (options) => {
//   // ================= CREATE TRANSPORTER =================
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD, // ✅ App password
//     },
//   });

//   // ================= EMAIL OPTIONS =================
//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to: options.email,
//     subject: options.subject,
//     html: options.html || options.message,
//   };

//   // ================= SEND EMAIL =================
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully");
//   } catch (error) {
//     console.error("❌ Email send error:", error);
//     console.log(error);
//     throw new Error("Email could not be sent");
//   }
// };

// export default sendEmail;


// ================= IMPORTS =================
import nodemailer from "nodemailer";

// ================= SEND EMAIL FUNCTION =================
const sendEmail = async (options) => {
  // ================= CREATE TRANSPORTER =================
  const transporter = nodemailer.createTransport({
    // Using host and port is more reliable on Render than the "service" shortcut
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // ✅ 16-character App password
    },
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