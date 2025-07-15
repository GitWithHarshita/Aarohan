import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaGavel, FaCalendarAlt, FaBalanceScale, FaUserTie, FaBuilding } from 'react-icons/fa';

interface CaseFormData {
  title: string;
  case_type: string;
  description: string;
  court: string;
  judge: string;
  next_hearing_date: string;
  status: 'pending' | 'active' | 'closed';
  priority: 'low' | 'medium' | 'high';
  client_name: string;
  client_contact: string;
}

const EnterCase: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CaseFormData>({
    title: '',
    case_type: '',
    description: '',
    court: '',
    judge: '',
    next_hearing_date: '',
    status: 'pending',
    priority: 'medium',
    client_name: '',
    client_contact: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.success('Case created (simulated)!');
    navigate('/pending-cases');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-green to-herbal-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-6 left-6">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </motion.button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="bg-deep-jungle text-white p-6 text-center">
            <h1 className="text-3xl font-extrabold">Enter New Case</h1>
            <p className="mt-2 text-fresh-sage">Fill in the details to create a new case record</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Case Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaGavel className="mr-2 text-herbal-green" />
                  Case Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              {/* Case Type */}
              <div>
                <label htmlFor="case_type" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaBalanceScale className="mr-2 text-herbal-green" />
                  Case Type
                </label>
                <select
                  id="case_type"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.case_type}
                  onChange={(e) => setFormData({ ...formData, case_type: e.target.value })}
                  required
                >
                  <option value="">Select case type</option>
                  <option value="civil">Civil</option>
                  <option value="criminal">Criminal</option>
                  <option value="family">Family</option>
                  <option value="corporate">Corporate</option>
                  <option value="property">Property</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Case Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {/* Court */}
              <div>
                <label htmlFor="court" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaBuilding className="mr-2 text-herbal-green" />
                  Court
                </label>
                <input
                  type="text"
                  id="court"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.court}
                  onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                  required
                />
              </div>

              {/* Judge */}
              <div>
                <label htmlFor="judge" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaUserTie className="mr-2 text-herbal-green" />
                  Judge
                </label>
                <input
                  type="text"
                  id="judge"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.judge}
                  onChange={(e) => setFormData({ ...formData, judge: e.target.value })}
                  required
                />
              </div>

              {/* Next Hearing Date */}
              <div>
                <label htmlFor="next_hearing_date" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaCalendarAlt className="mr-2 text-herbal-green" />
                  Next Hearing Date
                </label>
                <input
                  type="date"
                  id="next_hearing_date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.next_hearing_date}
                  onChange={(e) => setFormData({ ...formData, next_hearing_date: e.target.value })}
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority Level
                </label>
                <select
                  id="priority"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Client Name */}
              <div>
                <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
                  Client Name
                </label>
                <input
                  type="text"
                  id="client_name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  required
                />
              </div>

              {/* Client Contact */}
              <div>
                <label htmlFor="client_contact" className="block text-sm font-medium text-gray-700">
                  Client Contact
                </label>
                <input
                  type="text"
                  id="client_contact"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                  value={formData.client_contact}
                  onChange={(e) => setFormData({ ...formData, client_contact: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="px-8 py-3 bg-herbal-green text-white rounded-lg shadow-md hover:bg-spring-green transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-herbal-green disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Case...
                  </div>
                ) : 'Create Case'}
              </motion.button>
            </div>
          </form>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white border border-white/20"
        >
          <h3 className="text-xl font-semibold mb-4">Case Filing Tips</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-spring-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Include all relevant dates and details about the case</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-spring-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Be specific in the case description for better AI-powered assistance</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-spring-green mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Set the appropriate priority level to help with case scheduling</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default EnterCase;