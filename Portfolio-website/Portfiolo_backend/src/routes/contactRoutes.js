//Not in use anymore

const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const { validateContactForm } = require('../middlewares/validation');

// POST route for contact form submission
router.post('/contact', validateContactForm, submitContactForm);

module.exports = router;