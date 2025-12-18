import React from 'react';
import './PolicyPages.css';

export const Privacy: React.FC = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: December 18, 2025</p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and email address when you create an account</li>
            <li>Shipping address and contact information for orders</li>
            <li>Payment information (processed securely through Razorpay)</li>
            <li>Communications with our customer service</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Send you order confirmations and updates</li>
            <li>Respond to your inquiries and customer service requests</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>3. Information Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
          <ul>
            <li>Payment processors (Razorpay) to process transactions</li>
            <li>Shipping providers to deliver your orders</li>
            <li>Service providers who help us operate our website</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>For privacy-related questions, please contact us at:</p>
          <p><strong>Email:</strong> nikhilkmr6303@gmail.com</p>
        </section>
      </div>
    </div>
  );
};

