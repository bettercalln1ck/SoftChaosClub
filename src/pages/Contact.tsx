import React, { useState } from 'react';
import './PolicyPages.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    // In production, you'd send this to your backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="policy-page contact-page">
      <div className="policy-container">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">We'd love to hear from you! Reach out for any inquiries.</p>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p><a href="mailto:nikhilkmr6303@gmail.com">nikhilkmr6303@gmail.com</a></p>
              <p className="contact-note">Response time: Within 24 hours</p>
            </div>

            <div className="contact-item">
              <h3>🕐 Business Hours</h3>
              <p>Monday - Friday: 10:00 AM - 6:00 PM IST</p>
              <p>Saturday: 10:00 AM - 2:00 PM IST</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="contact-item">
              <h3>📍 Location</h3>
              <p>India</p>
              <p className="contact-note">Online orders shipped nationwide</p>
            </div>

            <div className="contact-item">
              <h3>💬 What We Can Help With</h3>
              <ul>
                <li>Product inquiries</li>
                <li>Order status</li>
                <li>Shipping questions</li>
                <li>Returns & refunds</li>
                <li>Custom artwork requests</li>
                <li>Technical support</li>
              </ul>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            {submitted && (
              <div className="success-message">
                ✅ Thank you! We'll get back to you within 24 hours.
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="shipping">Shipping Question</option>
                  <option value="return">Return/Refund</option>
                  <option value="product">Product Question</option>
                  <option value="custom">Custom Order</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button type="submit" className="btn-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

