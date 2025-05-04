const { sendInterestEmails } = require('../services/email.services'); // ✅ match the export name

const handleInterestForm = async (req, res) => {
  const { name, email, phone, dp, color } = req.body;

  console.log(name, email, phone, dp, color)

  if (!name || !email || !phone || !dp || !color) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await sendInterestEmails({ name, email, phone, dp, color }); // ✅ match the function name
    res.status(200).json({ message: 'Interest form submitted successfully.' });
  } catch (error) {
    console.error('Failed to send interest email:', error);
    res.status(500).json({ error: 'Failed to submit interest form.' });
  }
};

module.exports = { handleInterestForm };
