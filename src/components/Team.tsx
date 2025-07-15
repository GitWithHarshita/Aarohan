import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Team = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const team = [
    {
      name: 'Priyansh Singh',
      role: '',
      bio: 'Expert in machine learning models for legal document analysis',
      image: '/team-placeholder.jpg',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    {
      name: 'Krish Sen',
      role: '',
      bio: 'Leads technical innovation in our AI judiciary solutions',
      image: '/team-placeholder.jpg',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    {
      name: 'Harshita Sharma',
      role: '',
      bio: 'Specializes in predictive models for case outcome analysis',
      image: '/team-placeholder.jpg',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    {
      name: 'Vineet Raj',
      role: '',
      bio: 'Oversees our AI-powered judiciary platform development',
      image: '/team-placeholder.jpg',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-white to-fresh-sage/10">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-jungle mb-4">
              Meet Our <span className="text-herbal-green">Team</span>
            </h2>
            <p className="text-moss-green max-w-2xl mx-auto">
              Our diverse team of experts combines legal knowledge, technical innovation, 
              and dedication to transform the judiciary system through AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
              >
                <div className="h-64 bg-gradient-to-r from-fresh-sage to-herbal-green relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="p-4 text-white">
                      <p className="text-sm opacity-80">{member.bio}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-deep-jungle mb-1">
                    {member.name}
                  </h3>
                  <p className="text-herbal-green font-medium mb-3">{member.role}</p>
                  <div className="flex space-x-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-herbal-green transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-herbal-green transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-herbal-green transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <FaGithub size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 bg-white p-8 rounded-lg shadow-md border border-gray-100 text-center"
          >
            <h3 className="text-2xl font-bold text-deep-jungle mb-4">Join Our Team</h3>
            <p className="text-moss-green mb-6">
              Passionate about transforming the legal system with AI technology?
              We're always looking for talented individuals to join our mission.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-herbal-green text-white rounded-lg"
            >
              View Open Positions
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

export default Team;