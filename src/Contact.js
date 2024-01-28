import React from 'react';
import './Contact.css'; // Import the corresponding CSS file

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Feel free to reach out for assistance or support requests.</p>

      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your Name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your Email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" placeholder="Your Message"></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
