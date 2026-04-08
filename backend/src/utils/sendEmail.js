import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (options) => {
  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      to: [{ email: options.email }],
      sender: {
        email: process.env.EMAIL_FROM, // your email
        name: "ProgressTrack",
      },
      subject: options.subject,
      htmlContent: options.html || options.message,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent:", response.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email error:", error.message);
    return false;
  }
};

export default sendEmail;