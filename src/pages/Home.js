import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <video autoPlay muted loop className="hero-video">
          <source src="/assets/video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>B. TECH WALA HONEY</h1>
          <div className="tagline-typewriter">
            <Typewriter
              options={{
                strings: [
                  'Where Organic Meets Smart Sourcing.',
                  'Pure. Local. Transparent.',
                  'Honey by Engineers. Seriously.',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <Link to="/shop">
            <button className="fade-in-button">🍯 Explore Our Honey</button>
          </Link>
        </div>
      </div>

      {/* Product Teaser */}
      <section className="bestsellers">
        <h1>Bestsellers</h1>
        <div className="product-scroll">
          <Link to="/product/1" className="bestseller-link">
            <img src={`${process.env.PUBLIC_URL}/assets/honey1.jpg`} alt="Wild Forest Honey" />
          </Link>
          <Link to="/product/2" className="bestseller-link">
            <img src={`${process.env.PUBLIC_URL}/assets/honey2.jpg`} alt="Tulsi Honey" />
          </Link>
          <Link to="/product/3" className="bestseller-link">
            <img src={`${process.env.PUBLIC_URL}/assets/honey3.jpg`} alt="Jamun Honey" />
          </Link>
        </div>
      </section>


      {/* Honey DNA Section */}
      <section className="honey-dna">
        <h2>Honey DNA Breakdown</h2>
        <p className="dna-subtext">Discover what makes each jar unique</p>
        <div className="dna-grid">
          <div className="dna-card" data-aos="fade-up" data-aos-delay="100">
            <h4>Nectar Source</h4>
            <p>Jamun, Tulsi, Sidr, Acacia</p>
          </div>
          <div className="dna-card" data-aos="fade-up" data-aos-delay="200">
            <h4>Region</h4>
            <p>Himalayas, Sundarbans, Bihar, Rajasthan</p>
          </div>
          <div className="dna-card" data-aos="fade-up" data-aos-delay="300">
            <h4>Harvest Month</h4>
            <p>March – June</p>
          </div>
          <div className="dna-card" data-aos="fade-up" data-aos-delay="400">
            <h4>Bee Species</h4>
            <p>Apis cerana indica, Apis dorsata</p>
          </div>
          <div className="dna-card" data-aos="fade-up" data-aos-delay="500">
            <h4>Taste Notes</h4>
            <p>Fruity, Floral, Woody, Herbal</p>
          </div>
          <div className="dna-card" data-aos="fade-up" data-aos-delay="600">
            <h4>Color & Texture</h4>
            <p>Amber, Golden, Crystallized, Flowing</p>
          </div>
        </div>
      </section>
      {/* Subscription Banner Section */}
      <section className="subscribe-banner">
        <div className="subscribe-content">
          <div className="subscribe-left">
            <h2>Get sweet deals straight to your inbox</h2>
            <p>Sign up for honey updates, recipes, and exclusive discounts.</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="subscribe-right">
            <img src="/images/subscribe-bg.png" alt="Honey visual" />
          </div>
        </div>

        <div className="benefits-row">
          <div className="benefit"><span role="img" aria-label="shipping">🚚</span><p>Free Shipping</p></div>
          <div className="benefit"><span role="img" aria-label="support">📞</span><p>24/7 Support</p></div>
          <div className="benefit"><span role="img" aria-label="natural">🌿</span><p>100% Natural</p></div>
          <div className="benefit"><span role="img" aria-label="secure">🔒</span><p>Secure Payment</p></div>
        </div>
      </section>

      {/* About Section */}
      <footer className="site-footer" id="about">
        <div className="footer-content">
          <img src="/assets/logo.png" alt="B.TECH WALA Logo" className="footer-logo" />

          <p className="footer-tagline">
            <strong>B.TECH WALA NATURALS</strong> aims to bridge the gap between nature and personal care, providing effective products that enhance beauty and well-being while respecting the environment. Their dedication to natural ingredients, sustainability, and ethical practices sets them apart in the market, appealing to health-conscious consumers who prioritize quality and environmental responsibility.
          </p>

          <div className="footer-links">
            <a href="/">About Us</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms & Conditions</a>
            <a href="/">Refund Policy</a>
            <a href="/">Shipping & Delivery Policy</a>
          </div>

          <p className="footer-credit">
            © 2024 – All Rights reserved to <span className="green-text hover-underline">SML Organics Foods</span>
            &nbsp;|&nbsp;
            Built by <span className="blue-text hover-underline">SV Soft Solutions Pvt Ltd</span>
          </p>
        </div>
      </footer>


    </div>
  );
};

export default Home;
