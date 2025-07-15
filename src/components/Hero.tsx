import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const leftLogoOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rightLogoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="min-h-screen pt-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Main content section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mt-[200px] text-7xl font-bold text-deep-jungle mb-6">
              AI-Powered <span className="text-herbal-green">Judiciary System</span>
            </h2>
            <p className="text-moss-green text-[30px] mb-8">
              Advanced AI technology transforming case management and legal outcomes
            </p>
            <div className="space-y-4 mb-8 text-gray-600">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-herbal-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Reduces case processing time by up to 70%</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-herbal-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>AI-powered precedent analysis for better legal strategy</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-herbal-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Transparent and efficient case management ecosystem</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <motion.button
                onClick={() => navigate('/auth')}
                className="bg-herbal-green text-white px-10 py-5 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/enter-case')}
                className="bg-white border-2 border-forest-green text-forest-green px-10 py-5 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register a Case
              </motion.button>
            </div>
          </motion.div>

          <div className="md:w-1/2 relative h-[500px]">
            <motion.div
              className="absolute ml-[300px] mt-[300px] inset-0 flex justify-center items-center"
              style={{ opacity: rightLogoOpacity }}
            >
              <img
                src="/logo.jpeg"
                alt="AAROHAN Logo"
                className="w-200 h-200 object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* Pending Cases Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20 bg-white rounded-lg shadow-lg p-8 border border-fresh-sage/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h3 className="text-3xl font-bold text-deep-jungle mb-4">
                <span className="text-herbal-green">Pending Cases</span> Dashboard
              </h3>
              <p className="text-moss-green mb-6">
                Our AI-powered system intelligently categorizes and prioritizes pending cases,
                enabling lawyers to take on cases that match their expertise and availability.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-fresh-sage/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-deep-jungle">2</p>
                  <p className="text-sm text-moss-green">Civil Cases</p>
                </div>
                <div className="bg-fresh-sage/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-deep-jungle">1</p>
                  <p className="text-sm text-moss-green">Criminal Cases</p>
                </div>
                <div className="bg-fresh-sage/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-deep-jungle">2</p>
                  <p className="text-sm text-moss-green">Family Cases</p>
                </div>
              </div>
              <motion.button
                onClick={() => navigate('/pending-cases')}
                className="flex items-center text-herbal-green font-semibold"
                whileHover={{ x: 5 }}
              >
                View All Pending Cases
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </div>
            <div className="md:w-5/12">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-deep-jungle text-white p-4">
                  <h4 className="font-semibold">Featured Pending Case</h4>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-bold text-deep-jungle">Khanna Divorce Case</h5>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Medium</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                  Divorce case under Section 13B of Hindu Marriage Act involving division of substantial assets including family business and property in Delhi NCR. Negotiated favorable settlement terms for client.
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Filed: Apr 5, 2025</span>
                    <span>Case #: LT-2025-001</span>
                  </div>
                  <motion.button
                    onClick={() => navigate('/pending-cases')}
                    className="mt-4 w-full bg-herbal-green hover:bg-spring-green text-white py-2 px-4 rounded transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Take This Case
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillars of AI Judiciary section */}
        <motion.div
          className="w-full flex justify-center"
          style={{ opacity: leftLogoOpacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="mt-[150px] grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
            {[
              {
                title: 'Intelligent Analysis',
                description: 'AI-powered legal analysis comparing cases with thousands of precedents'
              },
              {
                title: 'Predictive Justice',
                description: 'Case outcome prediction based on historical data and legal patterns'
              },
              {
                title: 'Process Automation',
                description: 'Automated workflows reducing administrative burden on courts'
              },
              {
                title: 'Enhanced Access',
                description: 'Improved access to justice through digital transformation'
              }
            ].map((pillar) => (
              <motion.div
                key={pillar.title}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-fresh-sage"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="bg-fresh-sage p-4">
                  <h3 className="text-white font-bold text-lg">{pillar.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;