const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  } else if (email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }

  // Subject validation
  if (!subject || subject.trim().length === 0) {
    errors.push('Subject is required');
  } else if (subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }

  // Message validation
  if (!message || message.trim().length === 0) {
    errors.push('Message is required');
  } else if (message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }

  next();
};

module.exports = { validateContactForm };