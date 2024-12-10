import nodemailer from "nodemailer";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // SMTP server of your email provider
  port: 587, // Use 587 for STARTTLS
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your password or app-specific password
  },
});

// Simple in-memory rate limiter
const emailRateLimit = {};
const RATE_LIMIT_TIME = 60 * 1000; // 1 minute in milliseconds

const sendPasswordResetEmail = async (email, resetToken) => {
  const currentTime = Date.now();

  // Check if email was sent recently
  if (
    emailRateLimit[email] &&
    currentTime - emailRateLimit[email] < RATE_LIMIT_TIME
  ) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  try {
    const resetLink = `https://gerritvisser.nl/reset-password?token=${resetToken}`;

    // Configure the email content
    const mailOptions = {
      from: `"GerritVisser.nl > MemberPortal" <no-reply@gerritvisser.nl>`, // Sender address
      to: email, // Recipient email address
      subject: "Password Reset Request", // Subject of the email
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);

    // Update the rate limit timestamp for the email address
    emailRateLimit[email] = currentTime;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send password reset email");
  }
};

export default { sendPasswordResetEmail };
