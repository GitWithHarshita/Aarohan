import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBalanceScale, FaChartLine, FaShieldAlt, FaBrain, FaFileAlt, FaClock } from 'react-icons/fa';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <FaBrain className="text-herbal-green text-4xl mb-4" />,
      title: 'AI-Powered Case Analysis',
      description: 'Intelligent processing of case documents to extract key information, identify precedents, and provide legal insights.',
    },
    {
      icon: <FaChartLine className="text-herbal-green text-4xl mb-4" />,
      title: 'Predictive Case Outcomes',
      description: 'Advanced analytics to forecast possible case outcomes based on historical data and similar case patterns.',
    },
    {
      icon: <FaFileAlt className="text-herbal-green text-4xl mb-4" />,
      title: 'Automated Documentation',
      description: 'Generate legal documents, filings, and forms with AI assistance, reducing paperwork and administrative burden.',
    },
    {
      icon: <FaBalanceScale className="text-herbal-green text-4xl mb-4" />,
      title: 'Legal Precedent Matching',
      description: 'Instantly find and apply relevant case law from a vast database of legal precedents across jurisdictions.',
    },
    {
      icon: <FaClock className="text-herbal-green text-4xl mb-4" />,
      title: 'Efficient Case Scheduling',
      description: 'Optimize court calendars and hearing schedules to reduce delays and improve resource allocation.',
    },
    {
      icon: <FaShieldAlt className="text-herbal-green text-4xl mb-4" />,
      title: 'Data Security & Privacy',
      description: 'Enterprise-grade security protocols ensuring confidentiality and compliance with legal data protection standards.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-fresh-sage/5">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold text-deep-jungle mb-4"
            >
              Revolutionary <span className="text-herbal-green">Features</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-moss-green max-w-2xl mx-auto text-lg"
            >
              Our AI-powered judiciary platform offers cutting-edge capabilities to transform 
              legal processes and enhance justice delivery
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg border border-gray-100 transition-all"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-deep-jungle mb-3">
                  {feature.title}
                </h3>
                <p className="text-moss-green">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-herbal-green text-white px-8 py-4 rounded-lg inline-flex items-center"
              onClick={() => window.open('/enter-case', '_self')}
            >
              <span>Experience AI-Powered Justice</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;