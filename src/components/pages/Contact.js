import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaComment, FaCheck } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    console.log('Form submitted:', formData);
    // Show success message
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out with questions, feedback, or suggestions.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-text">
                <h3>Our Location</h3>
                <p>123 Education Street<br />Learning District<br />Knowledge City, 54321</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-text">
                <h3>Phone</h3>
                <p>(555) 123-4567</p>
                <p>Mon-Fri, 9AM-5PM EST</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>info@resourceblog.edu</p>
                <p>support@resourceblog.edu</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <FaComment />
              </div>
              <div className="contact-text">
                <h3>Live Chat</h3>
                <p>Available on our website</p>
                <p>Mon-Fri, 10AM-4PM EST</p>
              </div>
            </div>
          </div>
          
          <div className="contact-map">
            <div className="map-placeholder">
              <p>Interactive Map Placeholder</p>
              <small>(Google Maps would be embedded here in a production environment)</small>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          
          {submitted ? (
            <div className="form-success">
              <FaCheck />
              <h3>Thank you for your message!</h3>
              <p>We've received your inquiry and will get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
      
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h3>How can I contribute resources to the platform?</h3>
            <p>To contribute, create an account and request facilitator access. Once approved, you'll be able to upload educational resources through your dashboard.</p>
          </div>
          
          <div className="faq-item">
            <h3>Are all resources on the platform free?</h3>
            <p>Yes, all resources on Educational Resource Blog are completely free for educational use. We believe in making quality education accessible to everyone.</p>
          </div>
          
          <div className="faq-item">
            <h3>How can I report issues with the website or a resource?</h3>
            <p>You can report issues by using the contact form above or by sending an email directly to support@resourceblog.edu with details about the problem.</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I use the resources for my classroom?</h3>
            <p>Absolutely! Our resources are designed for educational use in classrooms, online learning, and personal development. We just ask that you credit the source.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 