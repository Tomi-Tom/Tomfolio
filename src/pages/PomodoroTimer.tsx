import { ReactElement, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '../layouts/PageLayout'

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak'

type TimerSettings = {
  pomodoro: number
  shortBreak: number
  longBreak: number
}

export default function PomodoroTimer(): ReactElement {
  // Default timer duration settings (in minutes)
  const defaultSettings: TimerSettings = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  }

  const [settings, setSettings] = useState<TimerSettings>(defaultSettings)
  const [mode, setMode] = useState<TimerMode>('pomodoro')
  const [secondsLeft, setSecondsLeft] = useState(defaultSettings.pomodoro * 60)
  const [isActive, setIsActive] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [formSettings, setFormSettings] = useState(defaultSettings)

  // Refs for audio
  const startSoundRef = useRef<HTMLAudioElement | null>(null)
  const pauseSoundRef = useRef<HTMLAudioElement | null>(null)
  const completeSoundRef = useRef<HTMLAudioElement | null>(null)

  // Calculate time remaining
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  // Update timer when mode changes
  useEffect(() => {
    setSecondsLeft(settings[mode] * 60)
    setIsActive(false)
  }, [mode, settings])

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else if (isActive && secondsLeft === 0) {
      // Timer complete
      completeSoundRef.current?.play()

      if (mode === 'pomodoro') {
        setCompletedPomodoros((prev) => prev + 1)
        if (completedPomodoros % 4 === 3) {
          // After 4 pomodoros, take a long break
          setMode('longBreak')
        } else {
          setMode('shortBreak')
        }
      } else {
        // After a break, start a new pomodoro
        setMode('pomodoro')
      }

      setIsActive(false)
    }

    return () => clearInterval(interval)
  }, [isActive, secondsLeft, mode, completedPomodoros])

  // Play sound when timer starts/stops
  useEffect(() => {
    if (isActive) {
      startSoundRef.current?.play()
    } else {
      pauseSoundRef.current?.play()
    }
  }, [isActive])

  // Handle timer controls
  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setSecondsLeft(settings[mode] * 60)
  }

  const skipToNext = () => {
    if (mode === 'pomodoro') {
      if (completedPomodoros % 4 === 3) {
        setMode('longBreak')
      } else {
        setMode('shortBreak')
      }
    } else {
      setMode('pomodoro')
    }
  }

  // Handle settings update
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormSettings({
      ...formSettings,
      [name]: parseInt(value),
    })
  }

  const saveSettings = () => {
    setSettings(formSettings)
    setShowSettings(false)
    setSecondsLeft(formSettings[mode] * 60)
  }

  // Calculate progress for the circle
  const totalSeconds = settings[mode] * 60
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 0
  const circumference = 2 * Math.PI * 140 // radius = 140
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <PageLayout>
      <div
        className="flex min-h-screen flex-col items-center pt-24 pb-32"
        style={{ background: 'var(--color-void)' }}
      >
        <motion.div
          className="container mx-auto max-w-4xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-gold mb-4 text-4xl font-bold">
              Pomodoro Timer
            </h1>
            <p className="text-secondary mx-auto mb-6 max-w-2xl text-lg">
              Boost your productivity with the Pomodoro Technique. Work in
              focused intervals with short breaks in between.
            </p>

            {/* Audio elements (hidden) */}
            <audio
              ref={startSoundRef}
              src="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3"
            />
            <audio
              ref={pauseSoundRef}
              src="https://assets.mixkit.co/sfx/preview/mixkit-clicking-on-a-web-element-2577.mp3"
            />
            <audio
              ref={completeSoundRef}
              src="https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
            />

            {/* Timer Mode Selector */}
            <div className="mb-12 flex justify-center gap-2">
              {(['pomodoro', 'shortBreak', 'longBreak'] as const).map(
                (timerMode) => (
                  <motion.button
                    key={timerMode}
                    onClick={() => setMode(timerMode)}
                    className={
                      mode === timerMode ? 'btn-gold' : 'btn-ghost-gold'
                    }
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {timerMode === 'pomodoro'
                      ? 'Focus'
                      : timerMode === 'shortBreak'
                        ? 'Short Break'
                        : 'Long Break'}
                  </motion.button>
                )
              )}
            </div>

            {/* Main Timer */}
            <div className="mb-12">
              <motion.div
                className="relative mx-auto mb-8 flex h-80 w-80 items-center justify-center"
                animate={{
                  scale: isActive ? [1, 1.02, 1] : 1,
                  transition: {
                    repeat: isActive ? Infinity : 0,
                    duration: 2,
                  },
                }}
              >
                {/* SVG circle timer */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 300 300"
                >
                  {/* Background circle */}
                  <circle
                    cx="150"
                    cy="150"
                    r="140"
                    fill="none"
                    stroke="var(--color-void-surface)"
                    strokeWidth="6"
                  />
                  {/* Progress circle with gold gradient */}
                  <circle
                    cx="150"
                    cy="150"
                    r="140"
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 150 150)"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <div
                  className="relative flex h-72 w-72 items-center justify-center rounded-full"
                  style={{ background: 'var(--color-void-elevated)' }}
                >
                  <motion.div
                    className="text-gold text-6xl font-bold"
                    animate={{ opacity: isActive ? [1, 0.8, 1] : 1 }}
                    transition={{
                      repeat: isActive ? Infinity : 0,
                      duration: 2,
                    }}
                  >
                    {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                  </motion.div>
                </div>
              </motion.div>

              {/* Timer Controls */}
              <div className="flex justify-center gap-4">
                <motion.button
                  onClick={toggleTimer}
                  className="btn-gold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive ? 'Pause' : 'Start'}
                </motion.button>
                <motion.button
                  onClick={resetTimer}
                  className="btn-ghost-gold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset
                </motion.button>
                <motion.button
                  onClick={skipToNext}
                  className="btn-ghost-gold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Skip
                </motion.button>
              </div>
            </div>

            {/* Stats and Settings */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div
                className="void-panel rounded-xl p-6"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-gold mb-4 text-xl font-bold">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="rounded-lg p-4 text-center"
                    style={{ background: 'var(--color-void-surface)' }}
                  >
                    <p className="text-dim text-sm">Completed</p>
                    <p className="text-gold text-3xl font-bold">
                      {completedPomodoros}
                    </p>
                  </div>
                  <div
                    className="rounded-lg p-4 text-center"
                    style={{ background: 'var(--color-void-surface)' }}
                  >
                    <p className="text-dim text-sm">Current Mode</p>
                    <p
                      className="text-xl font-bold capitalize"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {mode === 'pomodoro'
                        ? 'Focus'
                        : mode === 'shortBreak'
                          ? 'Short Break'
                          : 'Long Break'}
                    </p>
                  </div>
                  <div
                    className="col-span-2 rounded-lg p-4 text-center"
                    style={{ background: 'var(--color-void-surface)' }}
                  >
                    <p className="text-dim text-sm">Total Time (estimated)</p>
                    <p className="text-gold text-2xl font-bold">
                      {Math.floor(
                        (completedPomodoros * settings.pomodoro) / 60
                      )}{' '}
                      hours {(completedPomodoros * settings.pomodoro) % 60} min
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="void-panel rounded-xl p-6"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-gold text-xl font-bold">
                    Timer Settings
                  </h3>
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-secondary rounded-lg p-2"
                    style={{ background: 'var(--color-void-surface)' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ⚙️
                  </motion.button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div
                    className="rounded-lg p-4"
                    style={{ background: 'var(--color-void-surface)' }}
                  >
                    <p className="text-dim text-sm">Focus</p>
                    <p className="text-gold text-xl font-bold">
                      {settings.pomodoro} min
                    </p>
                  </div>
                  <div
                    className="rounded-lg p-4"
                    style={{ background: 'var(--color-void-surface)' }}
                  >
                    <p className="text-dim text-sm">Short Break</p>
                    <p className="text-gold text-xl font-bold">
                      {settings.shortBreak} min
                    </p>
                  </div>
                  <div
                    className="rounded-lg p-4"
                    style={{ background: 'var(--color-void-surface)' }}
                  >
                    <p className="text-dim text-sm">Long Break</p>
                    <p className="text-gold text-xl font-bold">
                      {settings.longBreak} min
                    </p>
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
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: 'rgba(0, 0, 0, 0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                className="void-panel w-full max-w-md rounded-xl p-8"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-gold mb-6 text-2xl font-bold">
                  Timer Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-secondary mb-2 block">
                      Focus Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="pomodoro"
                      value={formSettings.pomodoro}
                      onChange={handleSettingsChange}
                      min="1"
                      max="60"
                      className="input-void w-full"
                    />
                  </div>

                  <div>
                    <label className="text-secondary mb-2 block">
                      Short Break Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="shortBreak"
                      value={formSettings.shortBreak}
                      onChange={handleSettingsChange}
                      min="1"
                      max="30"
                      className="input-void w-full"
                    />
                  </div>

                  <div>
                    <label className="text-secondary mb-2 block">
                      Long Break Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="longBreak"
                      value={formSettings.longBreak}
                      onChange={handleSettingsChange}
                      min="1"
                      max="60"
                      className="input-void w-full"
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <motion.button
                      onClick={() => setShowSettings(false)}
                      className="btn-ghost-gold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={saveSettings}
                      className="btn-gold"
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
    </PageLayout>
  )
}
