import * as nodemailer from 'nodemailer';

// Create transporter using Gmail and your app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  }
});

// Function to send emails
async function send(from: string, receiver: string, subject: string, text: string, html?: string, options?: any) {
  const mailOptions = {
    from,
    to: receiver,
    subject,
    html,
    ...options,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

// Export the mailer function
export const mailer = { send };
