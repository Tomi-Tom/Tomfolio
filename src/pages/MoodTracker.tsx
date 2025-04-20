import { ReactElement, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

type MoodEntry = {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  energy: number; // 1-5 scale
  focus: number; // 1-5 scale
  notes: string;
  tags: string[];
  activities: string[];
};

type DateData = {
  date: string;
  dayName: string;
  shortDate: string;
  isToday: boolean;
};

// Activity categories with emojis
const activityOptions = [
  { id: 'exercise', label: 'Exercise', emoji: '🏃‍♂️' },
  { id: 'meditation', label: 'Meditation', emoji: '🧘‍♀️' },
  { id: 'work', label: 'Work/Study', emoji: '💼' },
  { id: 'social', label: 'Social', emoji: '👥' },
  { id: 'nature', label: 'Nature', emoji: '🌳' },
  { id: 'reading', label: 'Reading', emoji: '📚' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'creative', label: 'Creative', emoji: '🎨' },
  { id: 'sleep', label: 'Good Sleep', emoji: '😴' },
  { id: 'meds', label: 'Medication', emoji: '💊' },
  { id: 'nutrition', label: 'Nutrition', emoji: '🥗' },
];

// Mood level descriptions
const moodLevels = [
  { value: 1, label: 'Very Low', emoji: '😢', color: 'from-blue-700 to-blue-500' },
  { value: 2, label: 'Low', emoji: '😟', color: 'from-blue-500 to-blue-300' },
  { value: 3, label: 'Neutral', emoji: '😐', color: 'from-gray-500 to-gray-400' },
  { value: 4, label: 'Good', emoji: '🙂', color: 'from-green-500 to-green-300' },
  { value: 5, label: 'Great', emoji: '😄', color: 'from-green-700 to-green-500' },
];

// Energy level descriptions
const energyLevels = [
  { value: 1, label: 'Exhausted', emoji: '🔋', color: 'from-red-700 to-red-500' },
  { value: 2, label: 'Low', emoji: '🔋🔋', color: 'from-orange-700 to-orange-500' },
  { value: 3, label: 'Moderate', emoji: '🔋🔋🔋', color: 'from-yellow-700 to-yellow-500' },
  { value: 4, label: 'Energetic', emoji: '🔋🔋🔋🔋', color: 'from-lime-700 to-lime-500' },
  { value: 5, label: 'Very High', emoji: '🔋🔋🔋🔋🔋', color: 'from-green-700 to-green-500' },
];

// Focus level descriptions
const focusLevels = [
  { value: 1, label: 'Very Distracted', emoji: '🧠', color: 'from-red-700 to-red-500' },
  { value: 2, label: 'Distracted', emoji: '🧠🧠', color: 'from-orange-700 to-orange-500' },
  { value: 3, label: 'Moderate', emoji: '🧠🧠🧠', color: 'from-yellow-700 to-yellow-500' },
  { value: 4, label: 'Focused', emoji: '🧠🧠🧠🧠', color: 'from-blue-700 to-blue-500' },
  { value: 5, label: 'Hyper-focused', emoji: '🧠🧠🧠🧠🧠', color: 'from-indigo-700 to-indigo-500' },
];

// Tag options
const tagOptions = [
  'Overwhelmed', 'Anxious', 'Creative', 'Productive', 'Calm',
  'Frustrated', 'Motivated', 'Tired', 'Hyperfocus', 'Distracted',
  'Procrastinating', 'Happy', 'Stressed', 'Excited'
];

export default function MoodTracker(): ReactElement {
  // Local storage key
  const ENTRIES_STORAGE_KEY = 'adhd-mood-tracker-entries';
  
  // State
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MoodEntry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'calendar' | 'insights'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  // New entry form state
  const emptyEntry: MoodEntry = {
    id: '',
    date: new Date().toISOString().split('T')[0],
    mood: 3,
    energy: 3,
    focus: 3,
    notes: '',
    tags: [],
    activities: [],
  };
  const [newEntry, setNewEntry] = useState<MoodEntry>(emptyEntry);
  
  // Fetch entries from local storage
  useEffect(() => {
    const savedEntries = localStorage.getItem(ENTRIES_STORAGE_KEY);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);
  
  // Save entries to local storage
  useEffect(() => {
    localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);
  
  // Generate array of dates for the calendar (current week)
  const getDates = (): DateData[] => {
    const dates: DateData[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Start from 6 days ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);
    
    for (let i = 0; i < 13; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
      const shortDate = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);
      
      dates.push({
        date: dateString,
        dayName,
        shortDate,
        isToday: date.getTime() === today.getTime()
      });
    }
    
    return dates;
  };
  
  // Get dates for calendar
  const dates = getDates();
  
  // Functions for managing entries
  const saveEntry = () => {
    if (editingEntry) {
      // Update existing entry
      setEntries(entries.map(e => 
        e.id === editingEntry.id ? { ...newEntry, id: editingEntry.id } : e
      ));
    } else {
      // Create new entry
      const entryId = Date.now().toString();
      setEntries([...entries, { ...newEntry, id: entryId }]);
    }
    
    setShowEntryForm(false);
    setEditingEntry(null);
    setNewEntry(emptyEntry);
  };
  
  const startEditEntry = (entry: MoodEntry) => {
    setEditingEntry(entry);
    setNewEntry(entry);
    setShowEntryForm(true);
  };
  
  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
    setDeleteConfirmId(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: parseInt(value, 10) });
  };
  
  const toggleTag = (tag: string) => {
    const currentTags = [...newEntry.tags];
    if (currentTags.includes(tag)) {
      setNewEntry({ ...newEntry, tags: currentTags.filter(t => t !== tag) });
    } else {
      setNewEntry({ ...newEntry, tags: [...currentTags, tag] });
    }
  };
  
  const toggleActivity = (activityId: string) => {
    const currentActivities = [...newEntry.activities];
    if (currentActivities.includes(activityId)) {
      setNewEntry({ ...newEntry, activities: currentActivities.filter(a => a !== activityId) });
    } else {
      setNewEntry({ ...newEntry, activities: [...currentActivities, activityId] });
    }
  };
  
  // Get entry for selected date
  const getEntryForDate = (date: string) => {
    return entries.find(entry => entry.date === date);
  };
  
  const selectedDateEntry = getEntryForDate(selectedDate);
  
  // Calculate average mood, energy and focus for insights
  const calculateAverages = () => {
    if (entries.length === 0) return { mood: 0, energy: 0, focus: 0 };
    
    const totals = entries.reduce((acc, entry) => ({
      mood: acc.mood + entry.mood,
      energy: acc.energy + entry.energy,
      focus: acc.focus + entry.focus
    }), { mood: 0, energy: 0, focus: 0 });
    
    return {
      mood: Math.round((totals.mood / entries.length) * 100) / 100,
      energy: Math.round((totals.energy / entries.length) * 100) / 100,
      focus: Math.round((totals.focus / entries.length) * 100) / 100
    };
  };
  
  const averages = calculateAverages();
  
  // Calculate correlation between activities and metrics
  const calculateActivityImpact = () => {
    const impacts: Record<string, { count: number, mood: number, energy: number, focus: number }> = {};
    
    // Initialize impacts object
    activityOptions.forEach(activity => {
      impacts[activity.id] = { count: 0, mood: 0, energy: 0, focus: 0 };
    });
    
    // Sum up metrics for each activity
    entries.forEach(entry => {
      entry.activities.forEach(activityId => {
        if (impacts[activityId]) {
          impacts[activityId].count++;
          impacts[activityId].mood += entry.mood;
          impacts[activityId].energy += entry.energy;
          impacts[activityId].focus += entry.focus;
        }
      });
    });
    
    // Calculate averages
    const result = Object.keys(impacts).map(activityId => {
      const impact = impacts[activityId];
      const activity = activityOptions.find(a => a.id === activityId);
      
      if (impact.count === 0) {
        return {
          id: activityId,
          label: activity?.label || activityId,
          emoji: activity?.emoji || '',
          count: 0,
          mood: 0,
          energy: 0,
          focus: 0
        };
      }
      
      return {
        id: activityId,
        label: activity?.label || activityId,
        emoji: activity?.emoji || '',
        count: impact.count,
        mood: Math.round((impact.mood / impact.count) * 100) / 100,
        energy: Math.round((impact.energy / impact.count) * 100) / 100,
        focus: Math.round((impact.focus / impact.count) * 100) / 100
      };
    });
    
    // Sort by count, descending
    return result.sort((a, b) => b.count - a.count);
  };
  
  const activityImpacts = calculateActivityImpact();
  
  // Get color for mood/energy/focus level
  const getLevelInfo = (type: 'mood' | 'energy' | 'focus', value: number) => {
    const levels = type === 'mood' 
      ? moodLevels 
      : type === 'energy' 
        ? energyLevels 
        : focusLevels;
    
    return levels.find(level => level.value === value) || levels[2]; // Default to middle value
  };
  
  // Get pattern insights based on data
  const getPatternInsights = () => {
    if (entries.length < 3) return ['Add more entries to see patterns and insights'];
    
    const insights: string[] = [];
    
    // Check for most frequent tags
    const tagCounts: Record<string, number> = {};
    entries.forEach(entry => {
      entry.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    const mostFrequentTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([tag]) => tag);
    
    if (mostFrequentTags.length > 0) {
      insights.push(`Your most common states are: ${mostFrequentTags.join(', ')}`);
    }
    
    // Check for relationship between activities and mood/energy/focus
    const positiveActivities = activityImpacts
      .filter(a => a.count >= 2 && (a.mood > averages.mood || a.energy > averages.energy || a.focus > averages.focus))
      .slice(0, 3);
    
    if (positiveActivities.length > 0) {
      const activityList = positiveActivities
        .map(a => `${a.emoji} ${a.label}`)
        .join(', ');
      
      insights.push(`Activities that seem to improve your well-being: ${activityList}`);
    }
    
    // Check for patterns in energy levels
    const lowEnergyDays = entries.filter(e => e.energy <= 2).length;
    const highEnergyDays = entries.filter(e => e.energy >= 4).length;
    
    if (lowEnergyDays > highEnergyDays && lowEnergyDays >= 3) {
      insights.push('You appear to have more low-energy days. Consider energy management strategies.');
    }
    
    // Check for focus patterns
    if (averages.focus < 3) {
      insights.push('Your focus scores tend to be on the lower side. Explore strategies to support your attention.');
    }
    
    // Add generic insights if we don't have enough specific ones
    if (insights.length < 2) {
      insights.push('Consistent tracking will reveal more patterns and insights over time');
    }
    
    return insights;
  };

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center pt-24 pb-32">
        <motion.div 
          className="container mx-auto px-4 max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-orange-800">Mood & Energy Tracker</h1>
            <p className="mx-auto max-w-2xl mb-6 text-lg text-neutral-grey_1">
              Track your daily mood, energy, and focus levels to identify patterns and gain insights that can help manage ADHD symptoms.
            </p>
            
            {/* View Selector */}
            <div className="flex justify-center gap-4 mb-8">
              <motion.button
                onClick={() => setCurrentView('calendar')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentView === 'calendar' 
                    ? 'bg-orange-800 text-white' 
                    : 'bg-background-secondary text-neutral-grey_1'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Calendar
              </motion.button>
              <motion.button
                onClick={() => setCurrentView('insights')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentView === 'insights' 
                    ? 'bg-orange-800 text-white' 
                    : 'bg-background-secondary text-neutral-grey_1'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Insights
              </motion.button>
            </div>
          </div>

          {/* Calendar View */}
          {currentView === 'calendar' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-3">
                {/* Date Selector */}
                <div className="bg-background-secondary rounded-xl p-4 mb-8 overflow-x-auto">
                  <div className="flex space-x-2 min-w-max">
                    {dates.map((date) => {
                      const entry = getEntryForDate(date.date);
                      const isSelected = selectedDate === date.date;
                      
                      return (
                        <motion.button
                          key={date.date}
                          onClick={() => setSelectedDate(date.date)}
                          className={`flex flex-col items-center p-3 rounded-lg min-w-[70px] ${
                            isSelected 
                              ? 'bg-orange-800 text-white' 
                              : entry 
                                ? 'bg-background-primary text-white' 
                                : 'bg-background-tertiary text-neutral-grey_1'
                          } ${date.isToday ? 'ring-2 ring-orange-500' : ''}`}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-xs">{date.dayName}</span>
                          <span className="text-xl font-bold">{date.shortDate}</span>
                          {entry && (
                            <div className="flex mt-1 space-x-1">
                              <span className="text-lg">{moodLevels.find(m => m.value === entry.mood)?.emoji}</span>
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Selected Date Display */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                      {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h2>
                    <motion.button
                      onClick={() => {
                        if (selectedDateEntry) {
                          startEditEntry(selectedDateEntry);
                        } else {
                          setEditingEntry(null);
                          setNewEntry({
                            ...emptyEntry,
                            date: selectedDate
                          });
                          setShowEntryForm(true);
                        }
                      }}
                      className="px-4 py-2 bg-orange-800 text-white rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {selectedDateEntry ? 'Edit Entry' : 'Add Entry'}
                    </motion.button>
                  </div>
                  
                  {selectedDateEntry ? (
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ staggerChildren: 0.1 }}
                    >
                      {/* Mood Card */}
                      <motion.div 
                        className={`bg-gradient-to-br ${getLevelInfo('mood', selectedDateEntry.mood).color} rounded-xl p-6 text-white`}
                        whileHover={{ y: -5 }}
                      >
                        <h3 className="text-lg font-semibold mb-2">Mood</h3>
                        <div className="flex items-center">
                          <span className="text-4xl mr-3">{getLevelInfo('mood', selectedDateEntry.mood).emoji}</span>
                          <div>
                            <p className="text-2xl font-bold">{getLevelInfo('mood', selectedDateEntry.mood).label}</p>
                            <p className="text-sm opacity-90">Level {selectedDateEntry.mood}/5</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Energy Card */}
                      <motion.div 
                        className={`bg-gradient-to-br ${getLevelInfo('energy', selectedDateEntry.energy).color} rounded-xl p-6 text-white`}
                        whileHover={{ y: -5 }}
                      >
                        <h3 className="text-lg font-semibold mb-2">Energy</h3>
                        <div className="flex items-center">
                          <span className="text-4xl mr-3">{selectedDateEntry.energy >=3 ? '⚡' : '🔋'}</span>
                          <div>
                            <p className="text-2xl font-bold">{getLevelInfo('energy', selectedDateEntry.energy).label}</p>
                            <p className="text-sm opacity-90">Level {selectedDateEntry.energy}/5</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Focus Card */}
                      <motion.div 
                        className={`bg-gradient-to-br ${getLevelInfo('focus', selectedDateEntry.focus).color} rounded-xl p-6 text-white`}
                        whileHover={{ y: -5 }}
                      >
                        <h3 className="text-lg font-semibold mb-2">Focus</h3>
                        <div className="flex items-center">
                          <span className="text-4xl mr-3">{selectedDateEntry.focus >= 3 ? '🎯' : '🧠'}</span>
                          <div>
                            <p className="text-2xl font-bold">{getLevelInfo('focus', selectedDateEntry.focus).label}</p>
                            <p className="text-sm opacity-90">Level {selectedDateEntry.focus}/5</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Notes & Tags */}
                      <motion.div 
                        className="md:col-span-2 bg-background-secondary rounded-xl p-6"
                        whileHover={{ y: -5 }}
                      >
                        <h3 className="text-lg font-semibold mb-2">Notes</h3>
                        <p className="mb-4">
                          {selectedDateEntry.notes || 'No notes for this day.'}
                        </p>
                        
                        {selectedDateEntry.tags.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Tags:</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedDateEntry.tags.map(tag => (
                                <span 
                                  key={tag}
                                  className="px-3 py-1 bg-background-primary rounded-full text-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                      
                      {/* Activities */}
                      <motion.div 
                        className="bg-background-secondary rounded-xl p-6"
                        whileHover={{ y: -5 }}
                      >
                        <h3 className="text-lg font-semibold mb-2">Activities</h3>
                        {selectedDateEntry.activities.length === 0 ? (
                          <p>No activities recorded for this day.</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {selectedDateEntry.activities.map(activityId => {
                              const activity = activityOptions.find(a => a.id === activityId);
                              return (
                                <div 
                                  key={activityId}
                                  className="px-3 py-1 bg-background-primary rounded-full text-sm flex items-center"
                                >
                                  <span className="mr-1">{activity?.emoji}</span>
                                  <span>{activity?.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                      
                      {/* Action Buttons */}
                      <div className="md:col-span-3 flex justify-end space-x-3 mt-2">
                        <motion.button
                          onClick={() => setDeleteConfirmId(selectedDateEntry.id)}
                          className="text-sm px-4 py-2 bg-red-900/50 text-red-300 rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Delete Entry
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-background-secondary rounded-xl p-8 text-center">
                      <p className="text-white mb-4">
                        No entry for this date. 
                      </p>
                      <motion.button
                        onClick={() => {
                          setEditingEntry(null);
                          setNewEntry({
                            ...emptyEntry,
                            date: selectedDate
                          });
                          setShowEntryForm(true);
                        }}
                        className="px-4 py-2 bg-orange-800 text-white rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add Entry
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Insights View */}
          {currentView === 'insights' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Averages */}
              <motion.div 
                className="bg-background-secondary rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-orange-500 mb-4">Your Averages</h3>
                
                {entries.length === 0 ? (
                  <p className="text-neutral-grey_1">
                    No entries yet. Add some daily records to see insights.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {/* Mood Average */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Average Mood</span>
                        <span>{averages.mood.toFixed(1)}/5</span>
                      </div>
                      <div className="h-2 bg-background-primary rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(averages.mood / 5) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-neutral-grey_1 mt-1">
                        <span>Low</span>
                        <span>Neutral</span>
                        <span>High</span>
                      </div>
                    </div>
                    
                    {/* Energy Average */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Average Energy</span>
                        <span>{averages.energy.toFixed(1)}/5</span>
                      </div>
                      <div className="h-2 bg-background-primary rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(averages.energy / 5) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-neutral-grey_1 mt-1">
                        <span>Low</span>
                        <span>Moderate</span>
                        <span>High</span>
                      </div>
                    </div>
                    
                    {/* Focus Average */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Average Focus</span>
                        <span>{averages.focus.toFixed(1)}/5</span>
                      </div>
                      <div className="h-2 bg-background-primary rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(averages.focus / 5) * 100}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-neutral-grey_1 mt-1">
                        <span>Distracted</span>
                        <span>Moderate</span>
                        <span>Focused</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
              
              {/* Patterns & Insights */}
              <motion.div 
                className="bg-background-secondary rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-orange-500 mb-4">Patterns & Insights</h3>
                
                {entries.length < 3 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-white">
                    <p className="mb-4 text-center">
                      Add at least 3 entries to see patterns and insights.
                    </p>
                    <motion.button
                      onClick={() => {
                        setCurrentView('calendar');
                        setEditingEntry(null);
                        setNewEntry({
                          ...emptyEntry,
                          date: selectedDate
                        });
                        setShowEntryForm(true);
                      }}
                      className="px-4 py-2 bg-orange-800 text-white rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add Entry
                    </motion.button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {getPatternInsights().map((insight, index) => (
                      <motion.li 
                        key={index}
                        className="flex"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{insight}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
              
              {/* Activity Impact */}
              <motion.div 
                className="md:col-span-2 bg-background-secondary rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-orange-500 mb-4">Activity Impact</h3>
                
                {entries.length === 0 ? (
                  <p className="text-neutral-grey_1">
                    No entries yet. Add some daily records with activities to see their impact.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                      <thead>
                        <tr className="border-b border-neutral-grey_2">
                          <th className="text-left pb-3 font-medium">Activity</th>
                          <th className="text-center pb-3 font-medium">Occurrences</th>
                          <th className="text-center pb-3 font-medium">Mood</th>
                          <th className="text-center pb-3 font-medium">Energy</th>
                          <th className="text-center pb-3 font-medium">Focus</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityImpacts
                          .filter(impact => impact.count > 0)
                          .map(impact => (
                            <tr key={impact.id} className="border-b border-background-primary">
                              <td className="py-3">
                                <div className="flex items-center">
                                  <span className="text-2xl mr-2">{impact.emoji}</span>
                                  <span>{impact.label}</span>
                                </div>
                              </td>
                              <td className="text-center py-3">{impact.count}</td>
                              <td className="text-center py-3">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                  impact.mood > averages.mood 
                                    ? 'bg-green-800/30 text-green-400' 
                                    : impact.mood < averages.mood 
                                      ? 'bg-red-800/30 text-red-400' 
                                      : 'bg-neutral-800/30'
                                }`}>
                                  {impact.mood.toFixed(1)}
                                </span>
                              </td>
                              <td className="text-center py-3">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                  impact.energy > averages.energy 
                                    ? 'bg-green-800/30 text-green-400' 
                                    : impact.energy < averages.energy 
                                      ? 'bg-red-800/30 text-red-400' 
                                      : 'bg-neutral-800/30'
                                }`}>
                                  {impact.energy.toFixed(1)}
                                </span>
                              </td>
                              <td className="text-center py-3">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                  impact.focus > averages.focus 
                                    ? 'bg-green-800/30 text-green-400' 
                                    : impact.focus < averages.focus 
                                      ? 'bg-red-800/30 text-red-400' 
                                      : 'bg-neutral-800/30'
                                }`}>
                                  {impact.focus.toFixed(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        
                        {activityImpacts.filter(impact => impact.count > 0).length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-neutral-grey_1">
                              No activities recorded yet. Add entries with activities to see their impact.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Add/Edit Entry Modal */}
        <AnimatePresence>
          {showEntryForm && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEntryForm(false)}
            >
              <motion.div 
                className="bg-background-secondary p-8 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-orange-500 mb-6">
                  {editingEntry ? 'Edit Entry' : 'New Entry'} for {new Date(newEntry.date).toLocaleDateString()}
                </h2>
                
                <div className="space-y-8">
                  {/* Mood Slider */}
                  <div>
                    <label className="block text-neutral-grey_1 mb-4">
                      Mood
                    </label>
                    <div className="flex justify-between mb-2">
                      {moodLevels.map(level => (
                        <div 
                          key={level.value}
                          className={`flex flex-col items-center ${
                            newEntry.mood === level.value ? 'text-orange-500' : 'text-neutral-grey_1'
                          }`}
                        >
                          <span className="text-2xl">{level.emoji}</span>
                          <span className="text-xs mt-1 text-center">{level.label}</span>
                        </div>
                      ))}
                    </div>
                    <input
                      type="range"
                      name="mood"
                      min="1"
                      max="5"
                      step="1"
                      value={newEntry.mood}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-background-primary rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-600"
                    />
                  </div>
                  
                  {/* Energy Slider */}
                  <div>
                    <label className="block text-neutral-grey_1 mb-4">
                      Energy
                    </label>
                    <div className="flex justify-between mb-2">
                      {energyLevels.map(level => (
                        <div 
                          key={level.value}
                          className={`flex flex-col items-center ${
                            newEntry.energy === level.value ? 'text-orange-500' : 'text-neutral-grey_1'
                          }`}
                        >
                          <span className="text-2xl">{level.emoji}</span>
                          <span className="text-xs mt-1 text-center">{level.label}</span>
                        </div>
                      ))}
                    </div>
                    <input
                      type="range"
                      name="energy"
                      min="1"
                      max="5"
                      step="1"
                      value={newEntry.energy}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-background-primary rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-600"
                    />
                  </div>
                  
                  {/* Focus Slider */}
                  <div>
                    <label className="block text-neutral-grey_1 mb-4">
                      Focus
                    </label>
                    <div className="flex justify-between mb-2">
                      {focusLevels.map(level => (
                        <div 
                          key={level.value}
                          className={`flex flex-col items-center ${
                            newEntry.focus === level.value ? 'text-orange-500' : 'text-neutral-grey_1'
                          }`}
                        >
                          <span className="text-2xl">{level.emoji}</span>
                          <span className="text-xs mt-1 text-center">{level.label}</span>
                        </div>
                      ))}
                    </div>
                    <input
                      type="range"
                      name="focus"
                      min="1"
                      max="5"
                      step="1"
                      value={newEntry.focus}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-background-primary rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-600"
                    />
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Tags - How did you feel today?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tagOptions.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            newEntry.tags.includes(tag) 
                              ? 'bg-orange-800 text-white' 
                              : 'bg-background-primary text-neutral-grey_1'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Activities */}
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Activities - What did you do today?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {activityOptions.map(activity => (
                        <button
                          key={activity.id}
                          type="button"
                          onClick={() => toggleActivity(activity.id)}
                          className={`px-3 py-2 rounded-lg text-sm flex items-center ${
                            newEntry.activities.includes(activity.id) 
                              ? 'bg-orange-800 text-white' 
                              : 'bg-background-primary text-neutral-grey_1'
                          }`}
                        >
                          <span className="text-xl mr-2">{activity.emoji}</span>
                          <span>{activity.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Notes */}
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      value={newEntry.notes}
                      onChange={handleInputChange}
                      placeholder="Any additional thoughts about your day..."
                      className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none h-24 resize-none"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <motion.button
                      onClick={() => setShowEntryForm(false)}
                      className="px-6 py-3 bg-background-primary text-neutral-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={saveEntry}
                      className="px-6 py-3 bg-gradient-to-r from-orange-800 to-orange-500 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {editingEntry ? 'Update' : 'Save'} Entry
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirmId && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
            >
              <motion.div 
                className="bg-background-secondary p-8 rounded-xl shadow-2xl max-w-md w-full"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">Delete Entry?</h2>
                <p className="text-neutral-grey_1 mb-6">
                  Are you sure you want to delete this entry? This action cannot be undone.
                </p>
                
                <div className="flex justify-end gap-4">
                  <motion.button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-6 py-3 bg-background-primary text-neutral-white rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={() => deleteEntry(deleteConfirmId)}
                    className="px-6 py-3 bg-red-900 text-white rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}