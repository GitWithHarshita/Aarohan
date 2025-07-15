import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Case {
  id: string;
  case_number: string;
  title: string;
  description: string;
  date_filed: string;
  status: string;
  complexity: 'Low' | 'Medium' | 'High';
  client_name: string;
  resolution_date?: string;
  outcome?: string;
  next_hearing?: string; // Added field for next hearing date
}

// Indian cases data
const dummyCases: Case[] = [
  // Pending Cases
  {
    id: "1a2b3c4d",
    case_number: "CRL-2025-1493",
    title: "Sharma v. Delhi Metro Rail Corporation",
    description: "Personal injury claim resulting from a metro accident at Rajiv Chowk station. Client suffered back and neck injuries when the train made an emergency halt.",
    date_filed: "2025-03-15",
    status: "pending",
    complexity: "Medium",
    client_name: "Rajesh Sharma",
    next_hearing: "2025-04-18"
  },
  {
    id: "2e3f4g5h",
    case_number: "CS-2025-0426",
    title: "Verma Property Encroachment Dispute",
    description: "Civil suit regarding illegal encroachment on client's ancestral property in Lajpat Nagar. Municipal corporation failed to act despite multiple complaints.",
    date_filed: "2025-03-27",
    status: "pending",
    complexity: "Low",
    client_name: "Sunita Verma",
    next_hearing: "2025-04-29"
  },
  {
    id: "3i4j5k6l",
    case_number: "CRL-2025-2109",
    title: "State v. Malhotra",
    description: "Criminal defense case involving alleged GST fraud and tax evasion. Client is accused of misrepresenting business assets to evade ₹1.2 crore in taxes.",
    date_filed: "2025-04-02",
    status: "pending",
    complexity: "High",
    client_name: "Vikram Malhotra",
    next_hearing: "2025-04-25"
  },
  {
    id: "4m5n6o7p",
    case_number: "GMC-2025-0878",
    title: "Patel Custody Modification",
    description: "Client seeks modification of existing custody arrangement under the Hindu Marriage Act as ex-spouse is relocating to USA with matrimonial home in Mumbai.",
    date_filed: "2025-03-10",
    status: "pending",
    complexity: "Medium",
    client_name: "Nisha Patel",
    next_hearing: "2025-04-16"
  },
  {
    id: "5q6r7s8t",
    case_number: "ID-2025-0433",
    title: "Kumar v. Tech Solutions Pvt Ltd",
    description: "Client alleges workplace discrimination based on caste and religion, including unfair promotion practices and hostile work environment in Bengaluru IT company.",
    date_filed: "2025-04-05",
    status: "pending",
    complexity: "High",
    client_name: "Arjun Kumar",
    next_hearing: "2025-05-12"
  },
  
  // Completed Cases
  {
    id: "6u7v8w9x",
    case_number: "SMC-2024-2221",
    title: "Reddy Medical Negligence",
    description: "Successful settlement in medical negligence case against private hospital in Hyderabad. Client received compensation of ₹32 lakhs for additional medical expenses and pain and suffering.",
    date_filed: "2024-11-15",
    status: "completed",
    complexity: "High",
    client_name: "Latha Reddy",
    resolution_date: "2025-02-20",
    outcome: "Settled"
  },
  {
    id: "7y8z9a0b",
    case_number: "HMA-2024-1889",
    title: "Khanna Divorce Proceedings",
    description: "Divorce case under Section 13B of Hindu Marriage Act involving division of substantial assets including family business and property in Delhi NCR. Negotiated favorable settlement terms for client.",
    date_filed: "2024-12-05",
    status: "completed",
    complexity: "Medium",
    client_name: "Amit Khanna",
    resolution_date: "2025-03-01",
    outcome: "Settled"
  },
  {
    id: "8c9d0e1f",
    case_number: "WP-2024-0876",
    title: "Singh v. Ministry of External Affairs",
    description: "Successfully filed writ petition challenging client's visa denial to Australia. Demonstrated procedural violations in embassy's decision-making process.",
    date_filed: "2024-10-28",
    status: "completed",
    complexity: "Medium",
    client_name: "Manpreet Singh",
    resolution_date: "2025-01-15",
    outcome: "Won"
  }
];

const PendingCasesPage = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [caseType, setCaseType] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setCases(dummyCases.filter(c => c.status === caseType));
    setLoading(false);
  }, [caseType, navigate]);

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(c => c.complexity.toLowerCase() === filter.toLowerCase());

  // Function to navigate to courtroom with case details
  const goToCourtroom = (caseItem: Case) => {
    navigate(`/courtroom/${caseItem.id}`, { state: { caseDetails: caseItem } });
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-deep-jungle">
              {caseType === 'pending' ? 'Pending Matters' : 'Disposed Matters'}
            </h1>
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-forest-green text-white px-4 py-2 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <p className="text-sm text-gray-600">Pending Matters</p>
              <p className="text-2xl font-bold">{dummyCases.filter(c => c.status === 'pending').length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <p className="text-sm text-gray-600">Disposed Matters</p>
              <p className="text-2xl font-bold">{dummyCases.filter(c => c.status === 'completed').length}</p>
            </div>
          </div>
          
          <div className="bg-fresh-sage bg-opacity-10 p-4 rounded-lg mb-8">
            <p className="text-moss-green">
              {caseType === 'pending' 
                ? "As an advocate, you can view and accept pending matters that require legal representation. Select a case to view details or conduct virtual hearings through our AI-powered courtroom."
                : "These are your disposed matters. You can review details and outcomes of cases you've previously handled."
              }
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex space-x-2">
              <button 
                onClick={() => setCaseType('pending')}
                className={`px-4 py-2 rounded-md ${caseType === 'pending' ? 'bg-herbal-green text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Pending Matters
              </button>
              <button 
                onClick={() => setCaseType('completed')}
                className={`px-4 py-2 rounded-md ${caseType === 'completed' ? 'bg-herbal-green text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Disposed Matters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 ml-auto">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-herbal-green text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All Complexity
              </button>
              <button 
                onClick={() => setFilter('low')}
                className={`px-4 py-2 rounded-md ${filter === 'low' ? 'bg-herbal-green text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Low Complexity
              </button>
              <button 
                onClick={() => setFilter('medium')}
                className={`px-4 py-2 rounded-md ${filter === 'medium' ? 'bg-herbal-green text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Medium Complexity
              </button>
              <button 
                onClick={() => setFilter('high')}
                className={`px-4 py-2 rounded-md ${filter === 'high' ? 'bg-herbal-green text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                High Complexity
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herbal-green"></div>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">
                No {caseType} matters found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCases.map((caseItem) => (
                <motion.div
                  key={caseItem.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-deep-jungle">{caseItem.title}</h3>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        caseItem.status === 'completed' && caseItem.outcome === 'Won' ? 'bg-blue-100 text-blue-800' :
                        caseItem.status === 'completed' && caseItem.outcome === 'Settled' ? 'bg-purple-100 text-purple-800' :
                        caseItem.complexity === 'High' ? 'bg-red-100 text-red-800' : 
                        caseItem.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {caseItem.status === 'completed' ? caseItem.outcome : caseItem.complexity}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">CNR: {caseItem.case_number}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{caseItem.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>Client: {caseItem.client_name}</span>
                      <span>
                        {caseItem.status === 'completed' && caseItem.resolution_date
                          ? `Disposed: ${new Date(caseItem.resolution_date).toLocaleDateString()}`
                          : `Filed: ${new Date(caseItem.date_filed).toLocaleDateString()}`
                        }
                      </span>
                    </div>
                    
                    {/* Only show next hearing for pending cases */}
                    {caseItem.status === 'pending' && caseItem.next_hearing && (
                      <div className="bg-blue-50 p-2 rounded-md mb-4 text-sm flex justify-between items-center">
                        <span className="text-blue-700">Next Hearing: {new Date(caseItem.next_hearing).toLocaleDateString()}</span>
                        <motion.button
                          onClick={() => goToCourtroom(caseItem)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-deep-jungle text-white px-2 py-1 rounded text-xs flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Join Hearing
                        </motion.button>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <button 
                        className="flex-1 bg-herbal-green hover:bg-spring-green text-white py-2 px-4 rounded transition-colors"
                      >
                        {caseItem.status === 'pending' ? 'Accept Brief' : 'View Details'}
                      </button>
                      
                      {caseItem.status === 'pending' && (
                        <motion.button
                          onClick={() => goToCourtroom(caseItem)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-deep-jungle text-white py-2 px-4 rounded transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Courtroom
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PendingCasesPage;