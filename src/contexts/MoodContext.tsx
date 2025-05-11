import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { format } from 'date-fns';

export type MoodType = 'great' | 'good' | 'okay' | 'bad' | 'terrible';

export interface MoodEntry {
  id: string;
  date: string; // ISO date string
  mood: MoodType;
  notes?: string;
}

interface MoodContextType {
  moodEntries: MoodEntry[];
  todayMood?: MoodEntry;
  addMoodEntry: (mood: MoodType, notes?: string) => void;
  getMoodStats: () => {
    averageMood: number;
    moodDistribution: Record<MoodType, number>;
    weeklyMoods: Array<{ date: string; mood: number }>;
  };
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

// Helper function to convert mood type to numeric value (1-5)
const moodToValue = (mood: MoodType): number => {
  const values: Record<MoodType, number> = {
    terrible: 1,
    bad: 2,
    okay: 3,
    good: 4,
    great: 5
  };
  return values[mood];
};

// Helper function to get today's date as YYYY-MM-DD
const getTodayDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Load mood entries from localStorage when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedEntries = localStorage.getItem(`mood_entries_${user.id}`);
      if (savedEntries) {
        try {
          setMoodEntries(JSON.parse(savedEntries));
        } catch (error) {
          console.error('Error parsing saved mood entries:', error);
        }
      }
    }
  }, [isAuthenticated, user]);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user && moodEntries.length > 0) {
      localStorage.setItem(`mood_entries_${user.id}`, JSON.stringify(moodEntries));
    }
  }, [moodEntries, isAuthenticated, user]);

  // Get today's mood entry if it exists
  const todayMood = moodEntries.find(entry => entry.date === getTodayDate());

  const addMoodEntry = (mood: MoodType, notes?: string) => {
    const today = getTodayDate();
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: today,
      mood,
      notes
    };

    // Check if there's already an entry for today
    const existingEntryIndex = moodEntries.findIndex(entry => entry.date === today);

    if (existingEntryIndex >= 0) {
      // Update today's entry
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = newEntry;
      setMoodEntries(updatedEntries);
    } else {
      // Add new entry
      setMoodEntries(prev => [...prev, newEntry]);
    }
  };

  const getMoodStats = () => {
    // Calculate average mood
    const moodValues = moodEntries.map(entry => moodToValue(entry.mood));
    const sum = moodValues.reduce((acc, val) => acc + val, 0);
    const averageMood = moodValues.length > 0 ? sum / moodValues.length : 0;

    // Calculate mood distribution
    const moodDistribution: Record<MoodType, number> = {
      terrible: 0,
      bad: 0,
      okay: 0,
      good: 0,
      great: 0
    };

    moodEntries.forEach(entry => {
      moodDistribution[entry.mood]++;
    });

    // Get weekly moods (last 7 days)
    const today = new Date();
    const weeklyMoods = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const entry = moodEntries.find(e => e.date === dateStr);
      
      weeklyMoods.push({
        date: format(date, 'EEE'),
        mood: entry ? moodToValue(entry.mood) : 0
      });
    }

    return { averageMood, moodDistribution, weeklyMoods };
  };

  return (
    <MoodContext.Provider value={{ 
      moodEntries, 
      todayMood, 
      addMoodEntry, 
      getMoodStats 
    }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = (): MoodContextType => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};