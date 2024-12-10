import nodemailer from "nodemailer";

// Maak de transporter aan voor Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Gebruik geen versleuteling voor deze poort
  auth: {
    user: process.env.EMAIL_USER, // Zorg ervoor dat de omgeving variabele correct is ingesteld
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Zet deze optie om onveilige verbindingen toe te staan
  },
});

// Functie om een e-mail te verzenden
const sendTestEmail = async () => {
  try {
    const mailOptions = {
      from: "gerritvisser.webdev@gmail.com", // Vervang dit door je eigen e-mailadres
      to: "gervisz@live.nl", // Het test e-mailadres waar je de e-mail heen wilt sturen
      subject: "Test Email",
      text: "This is a test email", // De tekst van de e-mail
    };

    // Verstuur de e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Aanroepen van de functie
sendTestEmail();
