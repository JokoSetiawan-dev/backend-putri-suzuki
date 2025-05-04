const transporter = require('../config/mailer');

const sendInterestEmails = async (userData) => {
  const { name, email, phone, dp, color } = userData;

  // 1. Email to your business
  const toBusiness = {
    from: `"Product Interest Form" <${process.env.EMAIL_USER}>`,
    to: process.env.BUSINESS_EMAIL, // stored in .env
    subject: 'New Product Interest Submission',
    html: `
      <h2>New Product Interest Received</h2>
      <p><strong>Product:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Down Payment:</strong> ${dp}</p>
      <p><strong>Color Variant:</strong> ${color}</p>
    `,
  };

  // 2. Confirmation email to user
  const toUser = {
    from: `"Putri Suzuki" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Kami Menerima Pesanmu!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2c3e50;">Terimakasih Telah Menghubungi kami!</h2>
        <p>Kami telah menerima permintaan kamu dengan detail sebagai berikut:</p>
        <ul>
          <li><strong>Produk:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>No.Hp:</strong> ${phone}</li>
          <li><strong>Down Payment:</strong> ${dp}</li>
          <li><strong>Variasi Warna:</strong> ${color}</li>
        </ul>
        <p>Kami akan segera menghubungi anda.</p>
        <p style="margin-top: 20px;">Best regards,<br/>Putri Suzuki</p>
      </div>
    `,
  };

  // Send both emails
  await transporter.sendMail(toBusiness);
  await transporter.sendMail(toUser);
};

module.exports = { sendInterestEmails };
