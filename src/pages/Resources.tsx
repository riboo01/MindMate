import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, Video, Link as LinkIcon, Download, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface Resource {
  title: string;
  description: string;
  link: string;
  type: 'article' | 'video' | 'tool' | 'community';
  tags: string[];
  icon: React.ReactNode;
}

const Resources: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  
  const resources: Resource[] = [
    {
      title: "Understanding Stress in Academic Settings",
      description: "Learn about how stress affects students and strategies to manage academic pressure effectively.",
      link: "https://www.apa.org/topics/stress",
      type: "article",
      tags: ["stress", "academic", "coping"],
      icon: <FileText size={24} className="text-blue-500" />
    },
    {
      title: "Meditation for Beginners",
      description: "A comprehensive guide to getting started with meditation practices specifically for students.",
      link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      type: "article",
      tags: ["meditation", "mindfulness", "beginners"],
      icon: <FileText size={24} className="text-purple-500" />
    },
    {
      title: "Managing Test Anxiety",
      description: "Techniques and strategies to overcome anxiety before and during exams.",
      link: "https://youtu.be/FyBdA61GmJ0",
      type: "video",
      tags: ["anxiety", "exams", "techniques"],
      icon: <Video size={24} className="text-red-500" />
    },
    {
      title: "Sleep Hygiene for Students",
      description: "The importance of sleep for mental health and academic performance.",
      link: "https://www.sleepfoundation.org/articles/sleep-hygiene",
      type: "article",
      tags: ["sleep", "health", "performance"],
      icon: <FileText size={24} className="text-blue-500" />
    },
    {
      title: "Guided Meditation for Focus",
      description: "10-minute guided meditation specifically designed to improve concentration and focus.",
      link: "https://youtu.be/ZToicYcHIOU",
      type: "video",
      tags: ["meditation", "focus", "concentration"],
      icon: <Video size={24} className="text-red-500" />
    },
    {
      title: "Time Management for Students",
      description: "Effective strategies to manage your time and reduce stress during academic semesters.",
      link: "https://www.mindtools.com/pages/article/newHTE_88.htm",
      type: "article",
      tags: ["time management", "productivity", "organization"],
      icon: <FileText size={24} className="text-blue-500" />
    },
    {
      title: "Gratitude Journaling Template",
      description: "A downloadable template to start your gratitude journaling practice.",
      link: "#",
      type: "tool",
      tags: ["gratitude", "journaling", "positive psychology"],
      icon: <Download size={24} className="text-green-500" />
    },
    {
      title: "Student Mental Health Forum",
      description: "Connect with other students and share experiences and coping strategies.",
      link: "https://www.reddit.com/r/mentalhealthsupport/",
      type: "community",
      tags: ["community", "support", "peer"],
      icon: <Users size={24} className="text-teal-500" />
    },
    {
      title: "Deep Breathing Exercises",
      description: "Step-by-step guide to various breathing techniques for immediate stress relief.",
      link: "https://www.healthline.com/health/breathing-exercises",
      type: "article",
      tags: ["breathing", "anxiety", "stress relief"],
      icon: <FileText size={24} className="text-blue-500" />
    },
    {
      title: "Mental Health Apps Review",
      description: "Comparison of the top mental health apps for students.",
      link: "https://www.psycom.net/25-best-mental-health-apps",
      type: "article",
      tags: ["apps", "technology", "self-help"],
      icon: <FileText size={24} className="text-blue-500" />
    },
    {
      title: "How to Support a Friend in Crisis",
      description: "Learn how to help a friend who might be experiencing mental health difficulties.",
      link: "https://youtu.be/CEpRbLIPeMw",
      type: "video",
      tags: ["support", "friendship", "crisis"],
      icon: <Video size={24} className="text-red-500" />
    },
    {
      title: "Academic Burnout Prevention",
      description: "Recognize the signs of burnout and strategies to prevent it during academic pressure.",
      link: "https://www.verywellmind.com/burnout-symptoms-and-prevention-2795425",
      type: "article",
      tags: ["burnout", "prevention", "self-care"],
      icon: <FileText size={24} className="text-blue-500" />
    }
  ];

  // Filter resources based on active filter
  const filteredResources = activeFilter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === activeFilter);

  // Filter options
  const filters = [
    { value: 'all', label: 'All Resources' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'tool', label: 'Tools' },
    { value: 'community', label: 'Communities' }
  ];

  const popularTags = ['meditation', 'stress', 'anxiety', 'sleep', 'academic', 'focus'];

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Mental Health Resources</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our curated collection of resources to support your mental wellbeing.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/12">
          <div className="card sticky top-20 mb-6">
            <h2 className="text-lg font-semibold mb-4">Filter Resources</h2>
            <div className="space-y-2">
              {filters.map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    activeFilter === filter.value
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-4">Popular Topics</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium mb-2">Need immediate help?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                If you're experiencing a crisis or need urgent support:
              </p>
              <Link to="/emergency" className="btn btn-primary text-sm w-full">
                View Emergency Resources
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-9/12">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredResources.map((resource, index) => (
              <motion.div 
                key={index} 
                className="card h-full"
                variants={item}
              >
                <div className="flex items-start">
                  <div className="mr-4 mt-1">{resource.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <LinkIcon size={16} className="mr-1" />
                      View Resource
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredResources.length === 0 && (
            <div className="card text-center py-8">
              <Book size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different filter or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;