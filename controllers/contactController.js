const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  try {
    const newContact = new Contact({ 
      firstName, 
      lastName, 
      email, 
      phone, 
      subject, 
      message 
    });
    
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};