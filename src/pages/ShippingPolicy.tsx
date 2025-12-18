import React from 'react';
import './PolicyPages.css';

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Shipping Policy</h1>
        <p className="last-updated">Last Updated: December 18, 2025</p>

        <section>
          <h2>1. Shipping Coverage</h2>
          <p>We currently ship to all locations within India.</p>
        </section>

        <section>
          <h2>2. Processing Time</h2>
          <ul>
            <li><strong>Standard Orders:</strong> 2-3 business days</li>
            <li><strong>Custom Orders:</strong> 7-14 business days</li>
            <li>Orders are processed Monday-Friday (excluding holidays)</li>
            <li>You will receive tracking information via email once shipped</li>
          </ul>
        </section>

        <section>
          <h2>3. Delivery Time</h2>
          <table className="shipping-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Estimated Delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Major Cities (Delhi, Mumbai, Bangalore, etc.)</td>
                <td>3-5 business days</td>
              </tr>
              <tr>
                <td>Other Cities</td>
                <td>5-7 business days</td>
              </tr>
              <tr>
                <td>Remote Areas</td>
                <td>7-10 business days</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>4. Shipping Costs</h2>
          <ul>
            <li><strong>Orders above ₹10,000:</strong> FREE shipping</li>
            <li><strong>Orders below ₹10,000:</strong> ₹500 flat rate</li>
            <li>Shipping cost calculated at checkout</li>
          </ul>
        </section>

        <section>
          <h2>5. Packaging</h2>
          <p>All artworks are carefully packaged to ensure safe delivery:</p>
          <ul>
            <li>Wrapped in protective bubble wrap</li>
            <li>Placed in sturdy cardboard boxes</li>
            <li>Marked as "FRAGILE - HANDLE WITH CARE"</li>
            <li>Insured for transit damage</li>
          </ul>
        </section>

        <section>
          <h2>6. Order Tracking</h2>
          <ul>
            <li>Tracking number sent via email after shipment</li>
            <li>Track your order through courier partner's website</li>
            <li>SMS updates at key delivery milestones</li>
          </ul>
        </section>

        <section>
          <h2>7. Delivery Issues</h2>
          <h3>If your package is:</h3>
          <ul>
            <li><strong>Delayed:</strong> Contact us after expected delivery date + 3 days</li>
            <li><strong>Lost:</strong> We will file a claim and reship or refund</li>
            <li><strong>Damaged:</strong> Report within 48 hours with photos</li>
          </ul>
        </section>

        <section>
          <h2>8. Delivery Requirements</h2>
          <ul>
            <li>Someone must be available to receive the package</li>
            <li>Valid ID may be required for delivery</li>
            <li>Signature required for high-value items</li>
          </ul>
        </section>

        <section>
          <h2>9. International Shipping</h2>
          <p>Currently, we only ship within India. International shipping may be available in the future.</p>
        </section>

        <section>
          <h2>10. Contact for Shipping Queries</h2>
          <p><strong>Email:</strong> nikhilkmr6303@gmail.com</p>
          <p>We respond within 24 hours</p>
        </section>
      </div>
    </div>
  );
};

