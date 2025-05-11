import React from 'react';
import { PhoneCall, MessageCircle, MapPin, ExternalLink, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmergencyResource {
  name: string;
  description: string;
  phone?: string;
  sms?: string;
  website?: string;
  address?: string;
  hours?: string;
  icon: React.ReactNode;
}

const EmergencyResources: React.FC = () => {
  // Resources specific to Bangladesh
  const emergencyResources: EmergencyResource[] = [
    {
      name: "National Mental Health Helpline",
      description: "24/7 helpline for mental health crises in Bangladesh",
      phone: "16000",
      hours: "24/7",
      icon: <PhoneCall size={24} className="text-red-500" />
    },
    {
      name: "Kaan Pete Roi",
      description: "Emotional support and suicide prevention hotline",
      phone: "01779554391",
      hours: "3 PM - 9 PM, Every day",
      website: "https://www.kaanpeteroi.org/",
      icon: <PhoneCall size={24} className="text-blue-500" />
    },
    {
      name: "National Emergency Service",
      description: "For all emergency situations in Bangladesh",
      phone: "999",
      hours: "24/7",
      icon: <AlertTriangle size={24} className="text-red-500" />
    },
    {
      name: "Bangladesh Association of Psychiatrists",
      description: "Find a professional psychiatrist near you",
      website: "https://bap.org.bd/",
      icon: <MapPin size={24} className="text-green-500" />
    },
    {
      name: "BRAC Mental Health Counseling",
      description: "Low-cost mental health counseling services",
      phone: "09678771511",
      website: "https://www.brac.net/",
      hours: "9 AM - 5 PM, Sunday to Thursday",
      icon: <MessageCircle size={24} className="text-purple-500" />
    },
    {
      name: "National Institute of Mental Health",
      description: "Government mental health facility in Dhaka",
      phone: "02-9118171",
      address: "Sher-E-Bangla Nagar, Dhaka",
      website: "https://nimh.gov.bd/",
      hours: "8 AM - 3 PM, Sunday to Thursday",
      icon: <MapPin size={24} className="text-blue-500" />
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
      <motion.div 
        className="card bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400 mr-5 mb-4 md:mb-0">
            <AlertTriangle size={32} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
              In case of immediate danger
            </h2>
            <p className="text-red-700 dark:text-red-300">
              If you or someone you know is in immediate danger or at risk of harming themselves or others, please call the
              National Emergency Service at <a href="tel:999" className="font-bold underline">999</a> immediately.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Emergency Mental Health Resources</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find immediate help and support for mental health crises in Bangladesh. These resources are available to help you or someone you know during difficult times.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {emergencyResources.map((resource, index) => (
          <motion.div 
            key={index} 
            className="card h-full"
            variants={item}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
          >
            <div className="flex items-start">
              <div className="mr-4 mt-1">{resource.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{resource.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                
                <div className="space-y-2 text-sm">
                  {resource.phone && (
                    <div className="flex items-center">
                      <PhoneCall size={16} className="mr-2 text-gray-500" />
                      <a href={`tel:${resource.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {resource.phone}
                      </a>
                    </div>
                  )}
                  
                  {resource.sms && (
                    <div className="flex items-center">
                      <MessageCircle size={16} className="mr-2 text-gray-500" />
                      <span>{resource.sms}</span>
                    </div>
                  )}
                  
                  {resource.website && (
                    <div className="flex items-center">
                      <ExternalLink size={16} className="mr-2 text-gray-500" />
                      <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Visit website
                      </a>
                    </div>
                  )}
                  
                  {resource.address && (
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      <span>{resource.address}</span>
                    </div>
                  )}
                  
                  {resource.hours && (
                    <div className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
                      Hours: {resource.hours}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="card bg-blue-50 dark:bg-blue-900/20 mb-8">
        <h2 className="text-xl font-semibold mb-4">How to Support Someone in Crisis</h2>
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-300">
            If you're concerned about someone who may be experiencing a mental health crisis:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Stay with them and listen without judgment</li>
            <li>Remove potential means of self-harm if it's safe to do so</li>
            <li>Contact one of the crisis resources listed above</li>
            <li>Encourage them to speak with a mental health professional</li>
            <li>Offer to help them make and attend appointments</li>
          </ul>
        </div>
      </div>

      <div className="card bg-green-50 dark:bg-green-900/20">
        <h2 className="text-xl font-semibold mb-4">Self-Care During a Crisis</h2>
        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-300">
            If you're experiencing overwhelming emotions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Practice deep breathing: Inhale for 4 counts, hold for 4, exhale for 6</li>
            <li>Use the 5-4-3-2-1 technique: Name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste</li>
            <li>Reach out to a trusted friend or family member</li>
            <li>Remind yourself that these feelings are temporary</li>
            <li>Call one of the crisis hotlines above for immediate support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResources;