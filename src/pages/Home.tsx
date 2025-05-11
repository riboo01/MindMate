import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, BarChart2, LifeBuoy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  const features = [
    {
      icon: <MessageCircle size={24} className="text-blue-500" />,
      title: 'AI Chatbot Support',
      description: 'Talk to our AI assistant about your feelings and mental health concerns in a safe, judgment-free environment.',
      path: '/chat'
    },
    {
      icon: <Calendar size={24} className="text-teal-500" />,
      title: 'Mood Tracking',
      description: 'Record your daily mood and track your emotional health over time to identify patterns.',
      path: '/mood-tracker'
    },
    {
      icon: <BarChart2 size={24} className="text-purple-500" />,
      title: 'Insights Dashboard',
      description: 'Access personalized analytics, recommendations, and resources tailored to your needs.',
      path: '/dashboard'
    },
    {
      icon: <LifeBuoy size={24} className="text-red-500" />,
      title: 'Emergency Resources',
      description: 'Find immediate help and resources during a crisis, with options specific to Bangladesh.',
      path: '/emergency'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 mt-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to <span className="text-blue-600 dark:text-blue-400">Mind</span>
          <span className="text-teal-600 dark:text-teal-400">Mate</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your AI companion for mental wellbeing. Talk through your feelings, track your mood, and access resources tailored for students.
        </motion.p>
        
        {!isAuthenticated && (
          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/register" className="btn btn-primary px-6 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3">
              Sign In
            </Link>
          </motion.div>
        )}
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="card hover:shadow-lg transition-all cursor-pointer"
            variants={item}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
          >
            <Link to={isAuthenticated ? feature.path : '/login'} className="block h-full">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-16 mx-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">How MindMate Helps Students</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">01</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Immediate Support Anytime</h3>
                <p className="text-gray-600 dark:text-gray-300">Our AI chatbot is available 24/7, providing a safe space to express your feelings and get guidance during stressful periods like exams or deadlines.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                <span className="text-xl font-bold text-teal-600 dark:text-teal-400">02</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Self-Awareness Through Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">By recording your daily mood, you can identify patterns related to academic pressure, discover what triggers negative emotions, and develop healthier coping strategies.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm">
                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">03</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Practical Relaxation Techniques</h3>
                <p className="text-gray-600 dark:text-gray-300">Access guided meditation, breathing exercises, and stress-reduction techniques specifically designed to help you stay calm during study sessions and exams.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to prioritize your mental wellbeing?</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Start your journey toward better mental health today. MindMate is your companion every step of the way.
        </p>
        
        {!isAuthenticated ? (
          <Link to="/register" className="btn btn-primary px-8 py-3 text-lg">
            Join MindMate Today
          </Link>
        ) : (
          <Link to="/chat" className="btn btn-primary px-8 py-3 text-lg">
            Start Chatting
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;