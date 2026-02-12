const { createTransporter } = require('../config/emailConfig');

const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Log received form fields for debugging
    console.log('Received contact form submission:');
    console.log('  Name:', name);
    console.log('  Email:', email);
    console.log('  Subject:', subject);
    console.log('  Message:', message);

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email, // So you can reply directly to the sender
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Subject:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission
===========================

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---------------------------
This message was sent from your portfolio website contact form.
      `
    };

    // Send email
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);

    // Send auto-reply to the user (optional)
    const autoReplyOptions = {
      from: process.env.EMAIL_FROM || `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for your message!</h2>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Your Message:</strong></p>
            <p>${message}</p>
          </div>
          <p>Best regards,<br>Your Name</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(autoReplyOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Different error messages based on error type
    let errorMessage = 'Failed to send message. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email configuration error. Please check your email settings.';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { submitContactForm };