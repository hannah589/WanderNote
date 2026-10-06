import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.one}>
            <div>
              <div className='flex'>
                <img 
                  src="image"
                  className=" h-6 sm:h-12" 
                  alt="Travel Explorer Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">WanderNote</span>
              </div>
              <div className={styles.text}>
                <p>Discover breathtaking destinations, uncover hidden gems, and save the places that inspire your next adventure.</p>
              </div>
            </div>
            {/*<hr></hr>*/}
            <div className={styles.socialIcons}>
              <Link
                href="https://www.linkedin.com/company/travel-explorer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={24} />
              </Link>

              <Link
                to="https://www.instagram.com/travel_explorer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                  <FaInstagram size={24} />
              </Link>
            </div>
          </div>
          <div>
            <h6>Top Destinations</h6>
            <ul>
              <li><Link to="/destinations/japan">Japan</Link></li>
              <li><Link to="/destinations/china">China</Link></li>
              <li><Link to="/destinations/thailand">Thailand</Link></li>
              <li><Link to="/destinations/italy">Italy</Link></li>
              <li><Link to="/destinations/taiwan">Taiwan</Link></li>
              <li><Link to="/destinations">Explore More Destinations</Link></li>
            </ul>
          </div>
           <div>
            <h6>About</h6>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/terms">Terms and conditions</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} WanderNote. All rights reserved</p>
        </div>
      </footer>
  )
}

export default Footer
