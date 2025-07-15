import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaBalanceScale, FaUserGraduate, FaUser } from 'react-icons/fa';

type Role = 'trainee' | 'lawyer' | 'user';
type Mode = 'signin' | 'signup';

const commonSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  aadhar: z.string().regex(/^\d{12}$/, 'Aadhar number must be 12 digits'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const lawyerSchema = commonSchema.extend({
  barNumber: z.string().min(6, 'Bar number must be at least 6 characters'),
});

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('signin');
  const [role, setRole] = useState<Role>('user');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhar: '',
    email: '',
    password: '',
    barNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const schema = role === 'lawyer' ? lawyerSchema : commonSchema;
      schema.parse(formData);

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              role,
              name: formData.name,
              phone: formData.phone,
              aadhar: formData.aadhar,
              ...(role === 'lawyer' && { barNumber: formData.barNumber }),
            },
          },
        });

        if (error) throw error;
        toast.success('Successfully signed up! Please check your email for verification.');
        
        // Redirect lawyer to pending cases
        if (role === 'lawyer') {
          navigate('/pending-cases');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        toast.success('Successfully signed in!');
        
        // Check user metadata to determine role
        const userRole = data.user?.user_metadata?.role;
        if (userRole === 'lawyer') {
          navigate('/pending-cases');
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const getRoleDescription = () => {
    switch (role) {
      case 'lawyer':
        return "As a lawyer, you'll have access to pending cases, can submit legal arguments, and receive AI-assisted case analysis.";
      case 'trainee':
        return "As a trainee, you can observe cases, practice with AI simulations, and receive guidance on legal procedures.";
      case 'user':
        return "As a user, you can file new cases, track case progress, and receive updates on your legal matters.";
      default:
        return "";
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'lawyer':
        return <FaBalanceScale className="text-herbal-green text-xl mr-2" />;
      case 'trainee':
        return <FaUserGraduate className="text-herbal-green text-xl mr-2" />;
      case 'user':
        return <FaUser className="text-herbal-green text-xl mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fresh-sage/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-6 left-6">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-herbal-green text-white px-4 py-2 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </motion.button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl border border-gray-200"
      >
        <div>
          <div className="text-center mb-2">
            <FaUserShield className="mx-auto text-4xl text-herbal-green mb-2" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-deep-jungle">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'} to AAROHAN
          </h2>
          <p className="mt-2 text-center text-moss-green text-lg">
            {mode === 'signin' 
              ? 'Access your account to use our AI-powered judiciary services' 
              : 'Join our platform to experience next-generation legal technology'}
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setMode('signin')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'signin'
                  ? 'bg-herbal-green text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'signup'
                  ? 'bg-herbal-green text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <h3 className="text-center text-lg font-medium text-deep-jungle mb-2">Select Your Role</h3>
            <div className="flex justify-center space-x-4">
              {(['trainee', 'lawyer', 'user'] as Role[]).map((r) => (
                <motion.button
                  key={`role-select-${mode}-${r}`}
                  onClick={() => setRole(r)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    role === r
                      ? 'bg-fresh-sage text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {r}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-3 bg-fresh-sage/10 p-3 rounded-lg flex items-start">
              {getRoleIcon()}
              <p className="text-sm text-moss-green">{getRoleDescription()}</p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <div className="space-y-4">
              {mode === 'signup' && (
                <>
                  <motion.div
                    key="name-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                    />
                  </motion.div>

                  <motion.div
                    key="phone-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">We'll send important case updates to this number</p>
                  </motion.div>

                  <motion.div
                    key="aadhar-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Aadhar Number
                    </label>
                    <input
                      type="text"
                      placeholder="12-digit Aadhar number"
                      value={formData.aadhar}
                      onChange={(e) =>
                        setFormData({ ...formData, aadhar: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">Required for identity verification</p>
                  </motion.div>

                  {role === 'lawyer' && (
                    <motion.div
                      key="bar-number-input"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <label className="block text-sm font-medium text-gray-700">
                        Bar Council Registration Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Bar Council number"
                        value={formData.barNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, barNumber: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                      />
                      <p className="mt-1 text-xs text-gray-500">Required for lawyer verification and case access</p>
                    </motion.div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                />
                <p className="mt-1 text-xs text-gray-500">We'll never share your email with anyone else</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="8+ characters"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring focus:ring-herbal-green focus:ring-opacity-50"
                />
                <p className="mt-1 text-xs text-gray-500">Use a strong password with letters, numbers and symbols</p>
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-herbal-green hover:bg-spring-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-herbal-green"
              >
                {mode === 'signin' ? 'Sign In to Your Account' : 'Create Your Account'}
              </motion.button>
              
              {mode === 'signin' && (
                <p className="mt-4 text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="font-medium text-herbal-green hover:text-spring-green focus:outline-none"
                  >
                    Sign up now
                  </button>
                </p>
              )}
            </div>
          </AnimatePresence>
        </form>
        
        {mode === 'signup' && (
          <div className="text-xs text-gray-500 text-center mt-4">
            By signing up, you agree to our{' '}
            <a href="#" className="text-herbal-green hover:text-spring-green">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-herbal-green hover:text-spring-green">
              Privacy Policy
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;