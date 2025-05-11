import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useMood, MoodType } from '../contexts/MoodContext';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const MoodTracker: React.FC = () => {
  const { addMoodEntry, todayMood, moodEntries } = useMood();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(todayMood?.mood || null);
  const [notes, setNotes] = useState<string>(todayMood?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const moods: Array<{ value: MoodType; label: string; emoji: string; color: string }> = [
    { value: 'great', label: 'Great', emoji: '😄', color: 'bg-green-100 border-green-300 dark:bg-green-900/20 dark:border-green-800' },
    { value: 'good', label: 'Good', emoji: '🙂', color: 'bg-blue-100 border-blue-300 dark:bg-blue-900/20 dark:border-blue-800' },
    { value: 'okay', label: 'Okay', emoji: '😐', color: 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-800' },
    { value: 'bad', label: 'Bad', emoji: '😔', color: 'bg-orange-100 border-orange-300 dark:bg-orange-900/20 dark:border-orange-800' },
    { value: 'terrible', label: 'Terrible', emoji: '😫', color: 'bg-red-100 border-red-300 dark:bg-red-900/20 dark:border-red-800' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    // Add mood entry
    addMoodEntry(selectedMood, notes);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    
    setIsSubmitting(false);
  };

  // Get mood emoji for recent entries
  const getMoodEmoji = (mood: MoodType): string => {
    return moods.find(m => m.value === mood)?.emoji || '❓';
  };

  // Get last 5 mood entries
  const recentEntries = [...moodEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-7/12">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Mood Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your daily mood to better understand your emotional patterns.
            </p>
          </div>

          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar size={18} className="mr-2" />
              {todayMood ? 'Update Today\'s Mood' : 'How are you feeling today?'}
            </h2>

            {showSuccess && (
              <motion.div 
                className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-lg text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Your mood has been recorded successfully!
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="form-label">Select your mood:</label>
                <div className="grid grid-cols-5 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelectedMood(mood.value)}
                      className={`border ${mood.color} rounded-lg p-3 flex flex-col items-center transition-all ${
                        selectedMood === mood.value 
                          ? 'ring-2 ring-blue-500 dark:ring-blue-400 transform scale-105' 
                          : 'hover:bg-opacity-80'
                      }`}
                    >
                      <span className="text-2xl mb-1">{mood.emoji}</span>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="notes" className="form-label">Notes (optional):</label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-input resize-none"
                  placeholder="What's influencing your mood today?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!selectedMood || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : todayMood ? 'Update Mood' : 'Save Mood'}
              </button>
            </form>
          </div>
        </div>

        <div className="md:w-5/12">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Mood History</h2>
            
            {recentEntries.length > 0 ? (
              <div className="space-y-3">
                {recentEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center p-3 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-2xl mr-3">{getMoodEmoji(entry.mood)}</div>
                    <div className="flex-1">
                      <div className="font-medium">{format(new Date(entry.date), 'EEEE, MMMM d')}</div>
                      {entry.notes && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{entry.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No mood entries yet. Start tracking today!
              </p>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Why Track Your Mood?</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Identify patterns in your emotional well-being</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Recognize triggers that affect your mental health</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Track the effectiveness of coping strategies</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Share insights with mental health professionals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;