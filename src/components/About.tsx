
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="about" className="py-20 bg-white">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold text-deep-jungle text-center mb-6"
        >
          About <span className="text-herbal-green">AAROHAN</span>
        </motion.h2>
        
        <motion.p
          variants={itemVariants}
          className="text-moss-green text-center max-w-3xl mx-auto mb-16 text-lg"
        >
          Revolutionizing the judicial system with advanced artificial intelligence, 
          making justice more accessible, efficient, and equitable for all.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="bg-fresh-sage/10 p-8 rounded-lg shadow-sm border border-fresh-sage/20">
            <h3 className="text-2xl font-bold text-deep-jungle mb-4">Our Mission</h3>
            <p className="text-moss-green mb-4">
              AAROHAN is dedicated to transforming the judicial landscape by leveraging artificial 
              intelligence to reduce case backlogs, minimize delays, and enhance decision-making 
              processes across courts nationwide.
            </p>
            <ul className="space-y-2 text-moss-green">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-herbal-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Reduce judicial processing time by up to 30%</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-herbal-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ensure consistent application of legal principles</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-fresh-sage/10 p-8 rounded-lg shadow-sm border border-fresh-sage/20">
            <h3 className="text-2xl font-bold text-deep-jungle mb-4">Our Innovation</h3>
            <p className="text-moss-green mb-4">
              Our AI-powered judiciary platform combines natural language processing, machine learning,
              and legal analytics to create intelligent systems that support legal professionals and
              improve access to justice for citizens.
            </p>
            <ul className="space-y-2 text-moss-green">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-herbal-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Analyze millions of legal precedents in seconds</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-herbal-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Predict case outcomes with up to 74% accuracy</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-16 bg-deep-jungle text-white p-8 rounded-lg shadow-md"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-4xl font-bold text-herbal-green mb-2">3+</h4>
              <p className="text-gray-200">Cases Analyzed</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold text-herbal-green mb-2">68%</h4>
              <p className="text-gray-200">Faster Resolution</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold text-herbal-green mb-2">74%</h4>
              <p className="text-gray-200">Accuracy Rate</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;