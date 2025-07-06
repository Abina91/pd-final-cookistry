import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Useful Links */}
        <div>
          <h3 className="footer-heading">USEFUL LINKS</h3>
          <ul className="footer-list">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>GDPR Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Editors' Picks */}
        <div>
          <h3 className="footer-heading">EDITORS' PICKS</h3>
          <ul className="footer-list">
            <li>The Ultimate List of High Protein Indian Breakfast Ideas</li>
            <li>16 Easy and Light Indian Dinner Recipes</li>
            <li>Vanilla Sponge Cake</li>
            <li>Hong Kong Chicken</li>
            <li>20 Easy Indian Dinner Recipes for Weight Loss</li>
            <li>Soan Papdi</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="newsletter-heading">NEWSLETTER</h3>
          <div className="newsletter">
            <input
              type="text"
              placeholder="Newsletter"
              className="newsletter-input"
            />
            <div>
              <label className="email-label">Email <span className="required">*</span></label>
              <input
                type="email"
                placeholder="What is your e-mail address"
                className="newsletter-input"
              />
            </div>
            <button className="subscribe-btn">SEND ME THE RECIPES</button>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="footer-bottom">
        <p>&copy;2024 - All Rights Reserved. <span className="brand">Cookistry</span></p>
        <div className="social-icons">
          <button className="social-btn fb">FB</button>
          <button className="social-btn tw">TW</button>
          <button className="social-btn yt">YT</button>
          <button className="social-btn in">IN</button>
          <button className="social-btn ig">IG</button>
          <button className="social-btn p">P</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
