import { ReactElement, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

type TimerSettings = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
};

export default function PomodoroTimer(): ReactElement {
  // Default timer duration settings (in minutes)
  const defaultSettings: TimerSettings = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  };

  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState(defaultSettings.pomodoro * 60);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [formSettings, setFormSettings] = useState(defaultSettings);
  
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
  }, [mode, settings]);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      // Timer complete
      completeSoundRef.current?.play();
      
      if (mode === 'pomodoro') {
        setCompletedPomodoros(prev => prev + 1);
        if (completedPomodoros % 4 === 3) {
          // After 4 pomodoros, take a long break
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
      } else {
        // After a break, start a new pomodoro
        setMode('pomodoro');
      }
      
      setIsActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, mode, completedPomodoros]);

  // Play sound when timer starts/stops
  useEffect(() => {
    if (isActive) {
      startSoundRef.current?.play();
    } else {
      pauseSoundRef.current?.play();
    }
  }, [isActive]);

  // Handle timer controls
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(settings[mode] * 60);
  };

  const skipToNext = () => {
    if (mode === 'pomodoro') {
      if (completedPomodoros % 4 === 3) {
        setMode('longBreak');
      } else {
        setMode('shortBreak');
      }
    } else {
      setMode('pomodoro');
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

  // Get background color based on current mode
  const getBgColor = (): string => {
    switch (mode) {
      case 'pomodoro':
        return 'bg-gradient-to-br from-red-800 to-red-600';
      case 'shortBreak':
        return 'bg-gradient-to-br from-green-800 to-green-600';
      case 'longBreak':
        return 'bg-gradient-to-br from-blue-800 to-blue-600';
      default:
        return 'bg-gradient-to-br from-orange-800 to-orange-600';
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center pt-24 pb-32">
        <motion.div 
          className="container mx-auto px-4 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-orange-800">Pomodoro Timer</h1>
            <p className="mx-auto max-w-2xl mb-6 text-lg text-neutral-grey_1">
              Boost your productivity with the Pomodoro Technique. Work in focused intervals with short breaks in between.
            </p>

            {/* Audio elements (hidden) */}
            <audio ref={startSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3" />
            <audio ref={pauseSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-clicking-on-a-web-element-2577.mp3" />
            <audio ref={completeSoundRef} src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3" />

            {/* Timer Mode Selector */}
            <div className="flex justify-center gap-2 mb-12">
              {(['pomodoro', 'shortBreak', 'longBreak'] as const).map((timerMode) => (
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
                  {timerMode === 'pomodoro' 
                    ? 'Focus' 
                    : timerMode === 'shortBreak' 
                      ? 'Short Break' 
                      : 'Long Break'
                  }
                </motion.button>
              ))}
            </div>

            {/* Main Timer */}
            <div className="mb-12">
              <motion.div 
                className={`${getBgColor()} w-80 h-80 mx-auto rounded-full flex items-center justify-center shadow-xl mb-8`}
                animate={{ 
                  scale: isActive ? [1, 1.02, 1] : 1,
                  transition: {
                    repeat: isActive ? Infinity : 0,
                    duration: 2
                  }
                }}
              >
                <div className="bg-background-primary bg-opacity-20 w-72 h-72 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <motion.div 
                    className="text-white text-6xl font-bold"
                    animate={{ opacity: isActive ? [1, 0.8, 1] : 1 }}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                  >
                    {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                  </motion.div>
                </div>
              </motion.div>

              {/* Timer Controls */}
              <div className="flex justify-center gap-4">
                <motion.button
                  onClick={toggleTimer}
                  className="px-8 py-3 bg-gradient-to-r from-orange-800 to-orange-600 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive ? 'Pause' : 'Start'}
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
              </div>
            </div>

            {/* Stats and Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-background-secondary p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-orange-500 mb-4">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background-primary p-4 rounded-lg text-center">
                    <p className="text-neutral-grey_1 text-sm">Completed</p>
                    <p className="text-3xl font-bold text-white">{completedPomodoros}</p>
                  </div>
                  <div className="bg-background-primary p-4 rounded-lg text-center">
                    <p className="text-neutral-grey_1 text-sm">Current Mode</p>
                    <p className="text-xl font-bold text-white capitalize">
                      {mode === 'pomodoro' 
                        ? 'Focus' 
                        : mode === 'shortBreak' 
                          ? 'Short Break' 
                          : 'Long Break'
                      }
                    </p>
                  </div>
                  <div className="bg-background-primary p-4 rounded-lg text-center col-span-2">
                    <p className="text-neutral-grey_1 text-sm">Total Time (estimated)</p>
                    <p className="text-2xl font-bold text-white">
                      {Math.floor(completedPomodoros * settings.pomodoro / 60)} hours {completedPomodoros * settings.pomodoro % 60} min
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-background-secondary p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-orange-500">Timer Settings</h3>
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 bg-background-primary rounded-lg text-neutral-grey_1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ⚙️
                  </motion.button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-background-primary p-4 rounded-lg">
                    <p className="text-neutral-grey_1 text-sm">Focus</p>
                    <p className="text-xl font-bold text-white">{settings.pomodoro} min</p>
                  </div>
                  <div className="bg-background-primary p-4 rounded-lg">
                    <p className="text-neutral-grey_1 text-sm">Short Break</p>
                    <p className="text-xl font-bold text-white">{settings.shortBreak} min</p>
                  </div>
                  <div className="bg-background-primary p-4 rounded-lg">
                    <p className="text-neutral-grey_1 text-sm">Long Break</p>
                    <p className="text-xl font-bold text-white">{settings.longBreak} min</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

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
                      name="pomodoro"
                      value={formSettings.pomodoro}
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