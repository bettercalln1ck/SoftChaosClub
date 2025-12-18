import React from 'react';
import './PolicyPages.css';

export const Terms: React.FC = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Terms and Conditions</h1>
        <p className="last-updated">Last Updated: December 18, 2025</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        </section>

        <section>
          <h2>2. Use of Website</h2>
          <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the website.</p>
        </section>

        <section>
          <h2>3. Product Information</h2>
          <p>We strive to provide accurate information about our paintings, including:</p>
          <ul>
            <li>Accurate descriptions and dimensions</li>
            <li>High-quality images (actual colors may vary slightly)</li>
            <li>Current pricing in Indian Rupees (INR)</li>
          </ul>
        </section>

        <section>
          <h2>4. Orders and Payments</h2>
          <ul>
            <li>All orders are subject to availability</li>
            <li>Prices are in Indian Rupees (INR) and include applicable taxes</li>
            <li>We accept payments through Razorpay (UPI, Credit/Debit Cards, Net Banking)</li>
            <li>We reserve the right to refuse or cancel any order</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>All content on this website, including images, text, and artwork, is owned by ArtGallery or the respective artists and is protected by copyright laws.</p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>We shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
        </section>

        <section>
          <h2>7. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of India.</p>
        </section>

        <section>
          <h2>8. Contact Information</h2>
          <p>For questions about these terms, contact us at:</p>
          <p><strong>Email:</strong> nikhilkmr6303@gmail.com</p>
        </section>
      </div>
    </div>
  );
};

