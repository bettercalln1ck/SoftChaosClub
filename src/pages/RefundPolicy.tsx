import React from 'react';
import './PolicyPages.css';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Cancellation & Refund Policy</h1>
        <p className="last-updated">Last Updated: December 18, 2025</p>

        <section>
          <h2>1. Order Cancellation</h2>
          <h3>Before Shipment:</h3>
          <ul>
            <li>Orders can be cancelled within 24 hours of placement</li>
            <li>Full refund will be processed within 5-7 business days</li>
            <li>Contact us at nikhilkmr6303@gmail.com to cancel</li>
          </ul>
          <h3>After Shipment:</h3>
          <ul>
            <li>Orders cannot be cancelled once shipped</li>
            <li>Please refer to our return policy below</li>
          </ul>
        </section>

        <section>
          <h2>2. Return Policy</h2>
          <p>We accept returns under the following conditions:</p>
          <ul>
            <li><strong>Damaged Items:</strong> Report within 48 hours of delivery with photos</li>
            <li><strong>Wrong Item:</strong> Report within 48 hours with order details</li>
            <li><strong>Quality Issues:</strong> Report within 7 days with detailed description</li>
          </ul>
          <p><strong>Note:</strong> Artworks cannot be returned due to subjective preferences (color, style)</p>
        </section>

        <section>
          <h2>3. Refund Process</h2>
          <h3>Eligibility:</h3>
          <ul>
            <li>Item must be in original condition</li>
            <li>Original packaging must be intact</li>
            <li>Return must be initiated within eligible timeframe</li>
          </ul>
          <h3>Timeline:</h3>
          <ul>
            <li>Refund approval: 2-3 business days after receiving returned item</li>
            <li>Refund processing: 5-7 business days to original payment method</li>
          </ul>
        </section>

        <section>
          <h2>4. Non-Refundable Items</h2>
          <ul>
            <li>Custom or commissioned artwork</li>
            <li>Sale or clearance items (unless damaged)</li>
            <li>Items returned after 7 days</li>
          </ul>
        </section>

        <section>
          <h2>5. How to Initiate Return</h2>
          <ol>
            <li>Email us at <strong>nikhilkmr6303@gmail.com</strong></li>
            <li>Include order number and reason for return</li>
            <li>Attach photos if item is damaged</li>
            <li>We will provide return instructions within 24 hours</li>
          </ol>
        </section>

        <section>
          <h2>6. Shipping Costs</h2>
          <ul>
            <li><strong>Damaged/Wrong Item:</strong> We cover return shipping</li>
            <li><strong>Change of Mind:</strong> Customer bears return shipping cost</li>
          </ul>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>For cancellations or refunds, contact:</p>
          <p><strong>Email:</strong> nikhilkmr6303@gmail.com</p>
          <p><strong>Response Time:</strong> Within 24 hours</p>
        </section>
      </div>
    </div>
  );
};

