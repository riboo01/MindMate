import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Calendar, ArrowRight, Activity, TrendingUp, Play, Wind, Settings as Lungs } from 'lucide-react';
import { useMood, MoodType } from '../contexts/MoodContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

// Define tabs for dashboard sections
type DashboardTab = 'overview' | 'relax' | 'breathe' | 'meditate';

const Dashboard: React.FC = () => {
  const { moodEntries, getMoodStats } = useMood();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // Get mood statistics
  const { averageMood, moodDistribution, weeklyMoods } = getMoodStats();

  // Calculate streak (consecutive days with mood entries)
  const calculateStreak = () => {
    if (moodEntries.length === 0) return 0;
    
    const sortedEntries = [...moodEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const latestEntryDate = new Date(sortedEntries[0].date);
    latestEntryDate.setHours(0, 0, 0, 0);
    
    // Check if latest entry is from today or yesterday
    const dayDifference = Math.floor((today.getTime() - latestEntryDate.getTime()) / (1000 * 60 * 60 * 24));
    if (dayDifference > 1) return 0;
    
    // Calculate consecutive days
    for (let i = 1; i < sortedEntries.length; i++) {
      const currentDate = new Date(sortedEntries[i-1].date);
      const prevDate = new Date(sortedEntries[i].date);
      
      currentDate.setHours(0, 0, 0, 0);
      prevDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Prepare data for pie chart
  const pieData = Object.entries(moodDistribution).map(([mood, count]) => ({
    name: mood,
    value: count
  }));

  // Colors for pie chart
  const MOOD_COLORS = {
    terrible: '#EF4444', // red
    bad: '#F97316',      // orange
    okay: '#F59E0B',     // amber
    good: '#3B82F6',     // blue
    great: '#10B981'     // green
  };

  // Relaxation tips
  const relaxationTips = [
    {
      title: "5-4-3-2-1 Grounding Technique",
      description: "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense each muscle group for 5 seconds, then relax for 30 seconds. Start with your feet and work your way up to your face."
    },
    {
      title: "Mindful Observation",
      description: "Choose an object and focus on it for 5 minutes. Notice its color, texture, shape, and any patterns or imperfections."
    },
    {
      title: "Digital Detox",
      description: "Take a break from screens for at least 30 minutes before bedtime to help your mind wind down."
    },
    {
      title: "Nature Connection",
      description: "Spend time outside, even just 10 minutes, to reduce stress hormones and improve your mood."
    }
  ];

  // Breathing exercises
  const breathingExercises = [
    {
      title: "4-7-8 Breathing",
      description: "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times.",
      steps: ["Inhale (4 seconds)", "Hold (7 seconds)", "Exhale (8 seconds)"]
    },
    {
      title: "Box Breathing",
      description: "Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat 4 times.",
      steps: ["Inhale (4 seconds)", "Hold (4 seconds)", "Exhale (4 seconds)", "Hold (4 seconds)"]
    },
    {
      title: "Alternate Nostril Breathing",
      description: "Close your right nostril with your thumb, inhale through your left nostril. Close your left nostril with your ring finger, exhale through your right nostril.",
      steps: ["Close right nostril, inhale left", "Close left nostril, exhale right", "Inhale right", "Close right, exhale left"]
    }
  ];

  // Meditation videos
  const meditationVideos = [
    {
      title: "5-Minute Mindfulness Meditation",
      thumbnail: "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "5:00",
      link: "https://www.youtube.com/watch?v=inpok4MKVLM"
    },
    {
      title: "Breathing Meditation for Anxiety",
      thumbnail: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "10:23",
      link: "https://www.youtube.com/watch?v=O-6f5wQXSu8"
    },
    {
      title: "Body Scan Meditation for Sleep",
      thumbnail: "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "15:42",
      link: "https://www.youtube.com/watch?v=T0nuKBVQS7M"
    },
    {
      title: "Meditation for Focus & Concentration",
      thumbnail: "https://images.pexels.com/photos/3560068/pexels-photo-3560068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "8:17",
      link: "https://www.youtube.com/watch?v=ez3GgRqhNvA"
    }
  ];

  // Render Overview Tab
  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="card bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800">
              <Activity size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Mood</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {averageMood.toFixed(1)}/5.0
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-800">
              <Calendar size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Entries</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {moodEntries.length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="card bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-800">
              <TrendingUp size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {calculateStreak()} {calculateStreak() === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <BarChart2 size={18} className="mr-2" />
            Weekly Mood Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyMoods}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip 
                  formatter={(value: number) => {
                    if (value === 0) return ['No entry'];
                    return [value.toFixed(1)];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Mood ratings: 1 (Terrible) to 5 (Great)
          </div>
        </motion.div>

        <motion.div 
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-4">Mood Distribution</h3>
          {moodEntries.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData.filter(d => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={MOOD_COLORS[entry.name as MoodType]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Entries']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              No mood data available yet
            </div>
          )}
        </motion.div>
      </div>

      <div className="card bg-blue-50 dark:bg-blue-900/20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold text-lg">Need to relax?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore our relaxation techniques, breathing exercises, and guided meditations
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveTab('relax')}
              className="btn btn-secondary flex items-center gap-1"
            >
              <span>Relaxation Tips</span>
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => setActiveTab('breathe')}
              className="btn btn-accent flex items-center gap-1"
            >
              <span>Breathing Exercises</span>
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => setActiveTab('meditate')}
              className="btn bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1"
            >
              <span>Meditation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Relaxation Tips Tab
  const renderRelaxTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Relaxation Techniques</h2>
        <button 
          onClick={() => setActiveTab('overview')}
          className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white flex items-center gap-1"
        >
          <span>Back to Overview</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relaxationTips.map((tip, index) => (
          <motion.div 
            key={index}
            className="card h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                <Wind size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{tip.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card mt-8 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="font-semibold text-lg mb-4">Did You Know?</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Studies show that regular relaxation practice can reduce stress hormones like cortisol by up to 30% and improve academic performance by enhancing focus and memory retention.
        </p>
      </div>
    </div>
  );

  // Render Breathing Exercises Tab
  const renderBreatheTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Breathing Exercises</h2>
        <button 
          onClick={() => setActiveTab('overview')}
          className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white flex items-center gap-1"
        >
          <span>Back to Overview</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {breathingExercises.map((exercise, index) => (
          <motion.div 
            key={index}
            className="card h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="text-center mb-4">
              <div className="mx-auto p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 inline-block">
                <Lungs size={24} />
              </div>
              <h3 className="font-semibold text-lg mt-3">{exercise.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{exercise.description}</p>
            <div className="space-y-2 mt-auto">
              {exercise.steps.map((step, i) => (
                <div key={i} className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-xs mr-2">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card mt-8 bg-purple-50 dark:bg-purple-900/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-3/4">
            <h3 className="font-semibold text-lg mb-2">Interactive Breathing Exercise</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Follow along with our guided breathing animation. Take a moment to breathe deeply and relax your mind.
            </p>
          </div>
          <div className="md:w-1/4 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center">
                <div className="animate-ping absolute w-12 h-12 rounded-full bg-purple-400 opacity-30"></div>
                <div className="animate-pulse w-16 h-16 rounded-full bg-purple-500 opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Meditation Videos Tab
  const renderMeditateTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Guided Meditation Videos</h2>
        <button 
          onClick={() => setActiveTab('overview')}
          className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white flex items-center gap-1"
        >
          <span>Back to Overview</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meditationVideos.map((video, index) => (
          <motion.div 
            key={index}
            className="card h-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-48 object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <a 
                  href={video.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full"
                >
                  <Play size={24} className="text-gray-900" />
                </a>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <a 
              href={video.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline mt-2 inline-block"
            >
              Watch on YouTube
            </a>
          </motion.div>
        ))}
      </div>

      <div className="card mt-8 bg-teal-50 dark:bg-teal-900/20">
        <h3 className="font-semibold text-lg mb-4">Benefits of Meditation for Students</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Improved Focus</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Regular meditation can increase attention span by up to 15% after just 8 weeks of practice.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Stress Reduction</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Studies show meditation can reduce test anxiety and improve performance in academic settings.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Better Sleep</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mindfulness meditation before bed can help improve sleep quality and reduce insomnia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'relax':
        return renderRelaxTab();
      case 'breathe':
        return renderBreatheTab();
      case 'meditate':
        return renderMeditateTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Wellness Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress and discover resources to support your mental wellbeing.
        </p>

        {moodEntries.length === 0 && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-300 font-medium">
              You haven't recorded any moods yet. 
              <Link to="/mood-tracker" className="underline ml-1">
                Start tracking your mood
              </Link> to see insights and trends.
            </p>
          </div>
        )}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Dashboard;