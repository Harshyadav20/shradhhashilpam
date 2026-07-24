import express from 'express';
const router = express.Router();
import Contact from '../models/Contact.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // TODO: Send email notification using nodemailer

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

router.post('/', submitContact);

export default router;
