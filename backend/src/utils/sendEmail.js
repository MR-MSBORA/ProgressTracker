// import SibApiV3Sdk from "sib-api-v3-sdk";

// const client = SibApiV3Sdk.ApiClient.instance;

// const apiKey = client.authentications["api-key"];
// apiKey.apiKey = process.env.BREVO_API_KEY;

// const sendEmail = async (options) => {
//   try {
//     const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//     const sendSmtpEmail = {
//       to: [{ email: options.email }],
//       sender: {
//         email: process.env.EMAIL_FROM, // your email
//         name: "ProgressTrack",
//       },
//       subject: options.subject,
//       htmlContent: options.html || options.message,
//     };

//     const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

//     console.log("✅ Email sent:", response.messageId);
//     return true;
//   } catch (error) {
//     console.error("❌ Email error:", error.message);
//     return false;
//   }
// };

// export default sendEmail;


import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (options) => {
  try {
    console.log("EMAIL DATA:", {
      to: options.email,
      subject: options.subject,
      html: options.html,
      message: options.message,
      from: process.env.EMAIL_FROM,
    });

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      to: [{ email: options.email }],
      sender: {
        email: process.env.EMAIL_FROM,
        name: "ProgressTrack",
      },
      subject: options.subject || "Test Subject",
      htmlContent: options.html || options.message || "<h1>Test Email</h1>",
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent:", response);
    return true;
  } catch (error) {
    console.error("❌ FULL ERROR:", error.response?.body || error.message);
    return false;
  }
};

export default sendEmail;