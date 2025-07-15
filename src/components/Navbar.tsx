import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const navItems = ['Home', 'About', 'Features', 'Team'];
  const [scrolled, setScrolled] = useState(false);
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full py-4 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white text-deep-jungle shadow-md' 
          : 'bg-forest-green text-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="/logo.jpeg" 
            alt="AAROHAN" 
            className="h-10 w-10 rounded-full object-cover" 
          />
          <h1 className="text-2xl font-bold">AAROHAN</h1>
        </motion.div>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item.toLowerCase()}
              smooth={true}
              duration={500}
              className={`cursor-pointer font-medium py-1 border-b-2 border-transparent hover:border-herbal-green transition-all ${
                scrolled 
                  ? 'hover:text-herbal-green' 
                  : 'hover:text-spring-green'
              }`}
            >
              {item}
            </Link>
          ))}
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => navigate('/enter-case')}
              className={`cursor-pointer font-medium py-2 px-4 rounded-md border-2 transition-colors ${
                scrolled
                  ? 'border-herbal-green text-herbal-green hover:bg-herbal-green hover:text-white'
                  : 'border-spring-green text-white hover:bg-spring-green'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Case
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/auth')}
              className={`cursor-pointer font-medium py-2 px-6 rounded-md transition-colors ${
                scrolled
                  ? 'bg-herbal-green text-white hover:bg-spring-green'
                  : 'bg-spring-green text-white hover:bg-herbal-green'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login / Sign Up
            </motion.button>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className={`p-2 rounded-md ${
              scrolled 
                ? 'text-deep-jungle hover:bg-gray-100' 
                : 'text-white hover:bg-forest-green-light'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;