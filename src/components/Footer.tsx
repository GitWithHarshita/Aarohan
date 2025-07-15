import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  const socialLinks = [
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
  ];

  const quickLinks = [
    { name: 'About Us', to: 'about' },
    { name: 'Features', to: 'features' },
    { name: 'Our Team', to: 'team' },
  ];

  const actionLinks = [
    { name: 'Register a Case', path: '/enter-case' },
    { name: 'Lawyer Login', path: '/auth' },
    { name: 'View Pending Cases', path: '/pending-cases' },
  ];

  return (
    <footer className="bg-deep-jungle text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.jpeg" 
                alt="AAROHAN" 
                className="h-10 w-10 rounded-full object-cover" 
              />
              <h3 className="text-2xl font-bold">AAROHAN</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Revolutionizing the judicial system with AI technology to create more efficient, 
              accessible, and equitable legal processes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: '#62BD69' }}
                  className="text-white hover:text-spring-green transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-spring-green">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="hover:text-spring-green transition-colors flex items-center cursor-pointer"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-spring-green">Take Action</h4>
            <ul className="space-y-3">
              {actionLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => navigate(link.path)}
                    className="hover:text-spring-green transition-colors flex items-center text-left"
                    whileHover={{ x: 5 }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-spring-green">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-herbal-green mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                 Greater Noida, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-herbal-green mr-3 flex-shrink-0" />
                <span className="text-gray-300">+91 709 159 9891</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-herbal-green mr-3 flex-shrink-0" />
                <a href="mailto:info@aarohan.ai" className="text-gray-300 hover:text-spring-green transition-colors">
                  vineet.raj.cs27@iilm.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} AAROHAN. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-spring-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-spring-green transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-spring-green transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;