import { ReactElement, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

type TimerSettings = {
  focus: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
};

type Distraction = {
  id: string;
  text: string;
  timestamp: string;
  session: number;
  category: 'external' | 'internal' | 'physical' | 'other';
};

export default function ADHDPomodoro(): ReactElement {
  // Default timer duration settings (in minutes)
  const defaultSettings: TimerSettings = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4
  };

  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [secondsLeft, setSecondsLeft] = useState(defaultSettings.focus * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionCount, setSessionCount] = useState(1);
  const [formSettings, setFormSettings] = useState(defaultSettings);
  
  // Distraction tracking
  const [distractions, setDistractions] = useState<Distraction[]>([]);
  const [showDistractionForm, setShowDistractionForm] = useState(false);
  const [newDistraction, setNewDistraction] = useState({
    text: '',
    category: 'external' as 'external' | 'internal' | 'physical' | 'other'
  });
  const [, setShowDistractionLog] = useState(false);
  const [currentTab, setCurrentTab] = useState<'timer' | 'insights'>('timer');
  
  // Refs for audio
  const startSoundRef = useRef<HTMLAudioElement | null>(null);
  const pauseSoundRef = useRef<HTMLAudioElement | null>(null);
  const completeSoundRef = useRef<HTMLAudioElement | null>(null);

  // Calculate time remaining
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // Update timer when mode changes
  useEffect(() => {
    setSecondsLeft(settings[mode] * 60);
    setIsActive(false);
    setIsPaused(false);
  }, [mode, settings]);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && !isPaused && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      // Timer complete
      completeSoundRef.current?.play();
      
      if (mode === 'focus') {
        const newCompletedSessions = completedSessions + 1;
        setCompletedSessions(newCompletedSessions);
        
        if (newCompletedSessions % settings.longBreakInterval === 0) {
          // After X focus sessions, take a long break
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
        
        setSessionCount(prev => prev + 1);
      } else {
        // After a break, start a new focus session
        setMode('focus');
      }
      
      setIsActive(false);
      setIsPaused(false);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, secondsLeft, mode, completedSessions, settings]);

  // Play sound when timer starts/stops
  useEffect(() => {
    if (isActive && !isPaused) {
      startSoundRef.current?.play();
    } else if (isPaused) {
      pauseSoundRef.current?.play();
    }
  }, [isActive, isPaused]);

  // Handle timer controls
  const toggleTimer = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setSecondsLeft(settings[mode] * 60);
  };

  const skipToNext = () => {
    if (mode === 'focus') {
      if (completedSessions % settings.longBreakInterval === settings.longBreakInterval - 1) {
        setMode('longBreak');
      } else {
        setMode('shortBreak');
      }
      setCompletedSessions(prev => prev + 1);
    } else {
      setMode('focus');
    }
  };

  // Handle settings update
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormSettings({
      ...formSettings,
      [name]: parseInt(value)
    });
  };

  const saveSettings = () => {
    setSettings(formSettings);
    setShowSettings(false);
    setSecondsLeft(formSettings[mode] * 60);
  };

  // Handle distraction logging
  const handleDistractionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDistraction({
      ...newDistraction,
      [name]: value
    });
  };

  const logDistraction = () => {
    if (!newDistraction.text.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    
    const newDistractionItem: Distraction = {
      id: Date.now().toString(),
      text: newDistraction.text,
      timestamp,
      session: sessionCount,
      category: newDistraction.category
    };
    
    setDistractions([...distractions, newDistractionItem]);
    setNewDistraction({
      text: '',
      category: 'external'
    });
    setShowDistractionForm(false);
    
    // If timer is active, pause it
    if (isActive && !isPaused) {
      setIsPaused(true);
    }
  };

  const deleteDistraction = (id: string) => {
    setDistractions(distractions.filter(distraction => distraction.id !== id));
  };

  const getDistractionsByCategory = () => {
    const categories = {
      external: 0,
      internal: 0,
      physical: 0,
      other: 0
    };
    
    distractions.forEach(distraction => {
      categories[distraction.category]++;
    });
    
    return categories;
  };

  // Calculate distraction statistics
  const distractionStats = getDistractionsByCategory();
  const totalDistractions = distractions.length;
  const distractionsPerSession = totalDistractions > 0 ? 
    (totalDistractions / Math.max(1, sessionCount - 1)).toFixed(1) : 
    '0';

  // Get background color based on current mode
  const getBgColor = (): string => {
    switch (mode) {
      case 'focus':
        return 'bg-gradient-to-br from-purple-800 to-purple-600';
      case 'shortBreak':
        return 'bg-gradient-to-br from-green-800 to-green-600';
      case 'longBreak':
        return 'bg-gradient-to-br from-blue-800 to-blue-600';
      default:
        return 'bg-gradient-to-br from-purple-800 to-purple-600';
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center pt-24 pb-32">
        <motion.div 
          className="container mx-auto px-4 max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-orange-800">ADHD Pomodoro Timer</h1>
            <p className="mx-auto max-w-2xl mb-6 text-lg text-neutral-grey_1">
              A timer designed specifically for individuals with ADHD. Focus in manageable time blocks, track distractions, and build self-awareness.
            </p>

            {/* Audio elements (hidden) */}
            <audio ref={startSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3" />
            <audio ref={pauseSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-clicking-on-a-web-element-2577.mp3" />
            <audio ref={completeSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3" />

            {/* Tab Selector */}
            <div className="flex justify-center gap-4 mb-8">
              <motion.button
                onClick={() => setCurrentTab('timer')}
                className={`px-8 py-3 rounded-lg font-medium ${
                  currentTab === 'timer' 
                    ? 'bg-orange-800 text-white' 
                    : 'bg-background-secondary text-neutral-grey_1'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Timer
              </motion.button>
              <motion.button
                onClick={() => setCurrentTab('insights')}
                className={`px-8 py-3 rounded-lg font-medium ${
                  currentTab === 'insights' 
                    ? 'bg-orange-800 text-white' 
                    : 'bg-background-secondary text-neutral-grey_1'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Insights
              </motion.button>
            </div>
            
            {/* Timer Mode Selector - only visible in timer tab */}
            {currentTab === 'timer' && (
              <div className="flex justify-center gap-2 mb-8">
                {(['focus', 'shortBreak', 'longBreak'] as const).map((timerMode) => (
                  <motion.button
                    key={timerMode}
                    onClick={() => setMode(timerMode)}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      mode === timerMode 
                        ? 'bg-orange-800 text-white' 
                        : 'bg-background-secondary text-neutral-grey_1'
                    }`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {timerMode === 'focus' 
                      ? 'Focus' 
                      : timerMode === 'shortBreak' 
                        ? 'Short Break' 
                        : 'Long Break'
                    }
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Timer Tab Content */}
          {currentTab === 'timer' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Timer */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <motion.div 
                    className={`${getBgColor()} w-64 h-64 mx-auto rounded-full flex items-center justify-center shadow-xl mb-8 md:w-80 md:h-80`}
                    animate={{ 
                      scale: isActive && !isPaused ? [1, 1.02, 1] : 1,
                      transition: {
                        repeat: isActive && !isPaused ? Infinity : 0,
                        duration: 2
                      }
                    }}
                  >
                    <div className="bg-background-primary bg-opacity-20 w-56 h-56 rounded-full flex flex-col items-center justify-center backdrop-blur-sm md:w-72 md:h-72">
                      <motion.div 
                        className="text-white text-6xl font-bold mb-2"
                        animate={{ opacity: isActive && !isPaused ? [1, 0.8, 1] : 1 }}
                        transition={{ repeat: isActive && !isPaused ? Infinity : 0, duration: 2 }}
                      >
                        {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                      </motion.div>
                      <motion.div className="text-white text-xl opacity-80">
                        {mode === 'focus' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                      </motion.div>
                      {isActive && mode === 'focus' && (
                        <motion.button
                          onClick={() => setShowDistractionForm(true)}
                          className="mt-4 text-sm bg-white/20 px-3 py-1 rounded-full text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Log Distraction
                        </motion.button>
                      )}
                    </div>
                  </motion.div>

                  {/* Timer Controls */}
                  <div className="flex justify-center gap-4 flex-wrap">
                    <motion.button
                      onClick={toggleTimer}
                      className="px-8 py-3 bg-gradient-to-r from-orange-800 to-orange-600 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {!isActive ? 'Start' : isPaused ? 'Resume' : 'Pause'}
                    </motion.button>
                    <motion.button
                      onClick={resetTimer}
                      className="px-8 py-3 bg-background-secondary text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reset
                    </motion.button>
                    <motion.button
                      onClick={skipToNext}
                      className="px-8 py-3 bg-background-secondary text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Skip
                    </motion.button>
                    <motion.button
                      onClick={() => setShowSettings(true)}
                      className="px-8 py-3 bg-background-secondary text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Settings
                    </motion.button>
                  </div>
                </div>

                {/* Current Session Information */}
                <motion.div 
                  className="bg-background-secondary p-6 rounded-xl shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold text-orange-500 mb-4">Session Info</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-background-primary p-4 rounded-lg text-center">
                      <p className="text-neutral-grey_1 text-sm">Current Session</p>
                      <p className="text-3xl font-bold text-white">{sessionCount}</p>
                    </div>
                    <div className="bg-background-primary p-4 rounded-lg text-center">
                      <p className="text-neutral-grey_1 text-sm">Completed</p>
                      <p className="text-3xl font-bold text-white">{completedSessions}</p>
                    </div>
                    <div className="bg-background-primary p-4 rounded-lg text-center">
                      <p className="text-neutral-grey_1 text-sm">Mode</p>
                      <p className="text-xl font-bold text-white capitalize">
                        {mode === 'focus' 
                          ? 'Focus' 
                          : mode === 'shortBreak' 
                            ? 'Short Break' 
                            : 'Long Break'
                        }
                      </p>
                    </div>
                    <div className="bg-background-primary p-4 rounded-lg text-center">
                      <p className="text-neutral-grey_1 text-sm">Distractions</p>
                      <p className="text-3xl font-bold text-white">
                        {distractions.filter(d => d.session === sessionCount).length}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Distractions Panel */}
              <motion.div 
                className="bg-background-secondary p-6 rounded-xl shadow-lg h-min"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-orange-500">Recent Distractions</h3>
                  <motion.button
                    onClick={() => setShowDistractionLog(true)}
                    className="text-sm bg-background-primary px-3 py-1 rounded-lg text-neutral-grey_1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All
                  </motion.button>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {distractions.length === 0 ? (
                    <p className="text-neutral-grey_1 text-center py-8">
                      No distractions logged yet. Use the "Log Distraction" button when you get distracted during focus time.
                    </p>
                  ) : (
                    distractions.slice(-5).reverse().map((distraction) => (
                      <motion.div 
                        key={distraction.id}
                        className="bg-background-primary p-4 rounded-lg text-white"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-orange-500 mb-1">Session {distraction.session} • {distraction.timestamp}</p>
                            <p>{distraction.text}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs px-2 py-1 rounded-full bg-background-secondary capitalize mr-2">
                              {distraction.category}
                            </span>
                            <button 
                              onClick={() => deleteDistraction(distraction.id)}
                              className="text-neutral-grey_1 hover:text-red-500 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Insights Tab Content */}
          {currentTab === 'insights' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Distraction Statistics */}
              <motion.div 
                className="bg-background-secondary p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold text-orange-500 mb-4">Distraction Patterns</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-background-primary p-4 rounded-lg text-center">
                    <p className="text-neutral-grey_1 text-sm">Total Distractions</p>
                    <p className="text-3xl font-bold text-white">{totalDistractions}</p>
                  </div>
                  <div className="bg-background-primary p-4 rounded-lg text-center">
                    <p className="text-neutral-grey_1 text-sm">Per Session</p>
                    <p className="text-3xl font-bold text-white">{distractionsPerSession}</p>
                  </div>
                </div>
                
                {/* Distraction Categories */}
                <h4 className="text-lg font-semibold mb-3">Distraction Types</h4>
                <div className="space-y-4">
                  {Object.entries(distractionStats).map(([category, count]) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="capitalize">{category}</span>
                        <span>{count} ({totalDistractions ? Math.round(count / totalDistractions * 100) : 0}%)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-background-tertiary overflow-hidden">
                        <motion.div 
                          className={`h-full ${
                            category === 'external' ? 'bg-blue-500' :
                            category === 'internal' ? 'bg-purple-500' :
                            category === 'physical' ? 'bg-green-500' :
                            'bg-yellow-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: totalDistractions ? `${count / totalDistractions * 100}%` : '0%' }}
                          transition={{ delay: 0.5, duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Session History */}
              <motion.div 
                className="bg-background-secondary p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-orange-500 mb-4">Session Insights</h3>
                <div className="space-y-4">
                  <div className="bg-background-primary p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Total Focus Time</h4>
                    <p className="text-2xl font-bold">
                      {Math.floor(completedSessions * settings.focus / 60)} hours {completedSessions * settings.focus % 60} min
                    </p>
                  </div>
                  
                  <div className="bg-background-primary p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Completed Sessions</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: Math.min(30, completedSessions) }).map((_, i) => (
                        <motion.div 
                          key={i} 
                          className="w-6 h-6 rounded-full bg-orange-800"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        />
                      ))}
                      {completedSessions > 30 && (
                        <div className="flex items-center justify-center text-neutral-grey_1 ml-2">
                          +{completedSessions - 30} more
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-background-primary p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Tips Based on Your Patterns</h4>
                    <ul className="space-y-2 text-neutral-grey_1">
                      {distractionStats.external > distractionStats.internal && (
                        <li>• Try to minimize external distractions in your environment</li>
                      )}
                      {distractionStats.internal > distractionStats.external && (
                        <li>• Consider mindfulness techniques to help with internal distractions</li>
                      )}
                      {distractionStats.physical > 0 && (
                        <li>• Short movement breaks might help with physical restlessness</li>
                      )}
                      {totalDistractions > 0 && distractionsPerSession && parseFloat(distractionsPerSession) > 3 && (
                        <li>• Consider shorter focus sessions to match your attention span</li>
                      )}
                      {completedSessions > 0 && (
                        <li>• Great job completing {completedSessions} sessions! Keep building the habit</li>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              {/* All Distractions Log */}
              <motion.div 
                className="bg-background-secondary p-6 rounded-xl shadow-lg md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-orange-500 mb-4">Distraction Log</h3>
                {distractions.length === 0 ? (
                  <p className="text-neutral-grey_1 text-center py-12">
                    No distractions logged yet. Distractions will appear here when you log them during focus sessions.
                  </p>
                ) : (
                  <div className="grid gap-3 max-h-96 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
                    {distractions.slice().reverse().map((distraction) => (
                      <motion.div 
                        key={distraction.id}
                        className="bg-background-primary p-4 rounded-lg text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        layout
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-orange-500 mb-1">Session {distraction.session} • {distraction.timestamp}</p>
                            <p>{distraction.text}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`text-xs px-2 py-1 rounded-full mb-2 capitalize ${
                              distraction.category === 'external' ? 'bg-blue-500/30' :
                              distraction.category === 'internal' ? 'bg-purple-500/30' :
                              distraction.category === 'physical' ? 'bg-green-500/30' :
                              'bg-yellow-500/30'
                            }`}>
                              {distraction.category}
                            </span>
                            <button 
                              onClick={() => deleteDistraction(distraction.id)}
                              className="text-neutral-grey_1 hover:text-red-500 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Distraction Logging Modal */}
        <AnimatePresence>
          {showDistractionForm && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDistractionForm(false)}
            >
              <motion.div 
                className="bg-background-secondary p-8 rounded-xl shadow-2xl max-w-md w-full"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-orange-500 mb-4">What distracted you?</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Distraction
                    </label>
                    <textarea
                      name="text"
                      value={newDistraction.text}
                      onChange={handleDistractionInputChange}
                      placeholder="What pulled your attention away?"
                      ref={el => {
                        if (el) {
                          el.focus();
                        }
                      }}
                      className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none h-20 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={newDistraction.category}
                      onChange={handleDistractionInputChange}
                      className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none"
                    >
                      <option value="external">External (noise, people, notifications)</option>
                      <option value="internal">Internal (thoughts, worries, ideas)</option>
                      <option value="physical">Physical (hunger, discomfort, restlessness)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <motion.button
                      onClick={() => setShowDistractionForm(false)}
                      className="px-6 py-3 bg-background-primary text-neutral-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={logDistraction}
                      className="px-6 py-3 bg-gradient-to-r from-orange-800 to-orange-500 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Log Distraction
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            >
              <motion.div 
                className="bg-background-secondary p-8 rounded-xl shadow-2xl max-w-md w-full"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-orange-500 mb-6">Timer Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Focus Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="focus"
                      value={formSettings.focus}
                      onChange={handleSettingsChange}
                      min="1"
                      max="60"
                      className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Short Break Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="shortBreak"
                      value={formSettings.shortBreak}
                      onChange={handleSettingsChange}
                      min="1"
                      max="30"
                      className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Long Break Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="longBreak"
                      value={formSettings.longBreak}
                      onChange={handleSettingsChange}
                      min="1"
                      max="60"
                      className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Long Break After (sessions)
                    </label>
                    <input
                      type="number"
                      name="longBreakInterval"
                      value={formSettings.longBreakInterval}
                      onChange={handleSettingsChange}
                      min="1"
                      max="10"
                      className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <motion.button
                      onClick={() => setShowSettings(false)}
                      className="px-6 py-3 bg-background-primary text-neutral-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={saveSettings}
                      className="px-6 py-3 bg-gradient-to-r from-orange-800 to-orange-500 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}