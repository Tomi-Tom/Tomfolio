import { ReactElement, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

type Task = {
  id: string;
  title: string;
  steps: Step[];
  createdAt: string;
  completedAt: string | null;
  isExpanded: boolean;
};

type Step = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export default function TaskBreaker(): ReactElement {
  // Local storage keys
  const TASKS_STORAGE_KEY = 'adhd-task-breaker-tasks';
  
  // State for tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showAddStepForm, setShowAddStepForm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newStepText, setNewStepText] = useState('');
  const [bulkSteps, setBulkSteps] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  
  // Filter state
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  
  // Load tasks from local storage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  
  // Handle confetti when completing a task
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
  
  // Task Management Functions
  const createTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      steps: [],
      createdAt: new Date().toISOString(),
      completedAt: null,
      isExpanded: true
    };
    
    setTasks([...tasks, newTask]);
    setActiveTask(newTask);
    setNewTaskTitle('');
    setShowNewTaskForm(false);
    setShowAddStepForm(true);
  };
  
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (activeTask?.id === taskId) {
      setActiveTask(null);
    }
  };
  
  const toggleTaskExpand = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isExpanded: !task.isExpanded } 
        : task
    ));
  };
  
  // Step Management Functions
  const addStep = () => {
    if (!activeTask) return;
    if (!newStepText.trim() && !bulkMode) return;
    
    let newSteps: Step[] = [];
    
    if (bulkMode) {
      // Process bulk steps (one per line)
      newSteps = bulkSteps
        .split('\n')
        .filter(text => text.trim())
        .map(text => ({
          id: Date.now() + Math.random().toString(),
          text: text.trim(),
          isCompleted: false
        }));
      
      setBulkSteps('');
      setBulkMode(false);
    } else {
      // Add a single step
      newSteps = [{
        id: Date.now().toString(),
        text: newStepText,
        isCompleted: false
      }];
      
      setNewStepText('');
    }
    
    if (newSteps.length === 0) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === activeTask.id 
        ? { ...task, steps: [...task.steps, ...newSteps] } 
        : task
    );
    
    setTasks(updatedTasks);
    setActiveTask(updatedTasks.find(task => task.id === activeTask.id) || null);
  };
  
  const toggleStepCompletion = (taskId: string, stepId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id !== taskId) return task;
      
      const updatedSteps = task.steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: !step.isCompleted } 
          : step
      );
      
      // Check if all steps are completed
      const allStepsCompleted = updatedSteps.length > 0 && updatedSteps.every(step => step.isCompleted);
      
      return {
        ...task,
        steps: updatedSteps,
        completedAt: allStepsCompleted && !task.completedAt 
          ? new Date().toISOString() 
          : !allStepsCompleted ? null : task.completedAt
      };
    });
    
    setTasks(updatedTasks);
    
    // Find the updated task and step to check if it completed the entire task
    const updatedTask = updatedTasks.find(task => task.id === taskId);
    const justCompleted = updatedTask?.completedAt && 
      !tasks.find(task => task.id === taskId)?.completedAt;
    
    if (justCompleted) {
      setShowConfetti(true);
    }
    
    // Update active task if needed
    if (activeTask?.id === taskId) {
      setActiveTask(updatedTask || null);
    }
  };
  
  const deleteStep = (taskId: string, stepId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id !== taskId) return task;
      
      const updatedSteps = task.steps.filter(step => step.id !== stepId);
      
      // Check if all remaining steps are completed
      const allStepsCompleted = updatedSteps.length > 0 && updatedSteps.every(step => step.isCompleted);
      
      return {
        ...task,
        steps: updatedSteps,
        completedAt: allStepsCompleted ? task.completedAt : null
      };
    });
    
    setTasks(updatedTasks);
    
    // Update active task if needed
    if (activeTask?.id === taskId) {
      setActiveTask(updatedTasks.find(task => task.id === taskId) || null);
    }
  };
  
  const moveStep = (taskId: string, stepId: string, direction: 'up' | 'down') => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;
    
    const task = tasks[taskIndex];
    const stepIndex = task.steps.findIndex(step => step.id === stepId);
    if (stepIndex === -1) return;
    
    const newSteps = [...task.steps];
    
    if (direction === 'up' && stepIndex > 0) {
      // Move step up
      [newSteps[stepIndex], newSteps[stepIndex - 1]] = [newSteps[stepIndex - 1], newSteps[stepIndex]];
    } else if (direction === 'down' && stepIndex < newSteps.length - 1) {
      // Move step down
      [newSteps[stepIndex], newSteps[stepIndex + 1]] = [newSteps[stepIndex + 1], newSteps[stepIndex]];
    } else {
      // Can't move in that direction
      return;
    }
    
    const updatedTask = { ...task, steps: newSteps };
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    
    setTasks(updatedTasks);
    
    // Update active task if needed
    if (activeTask?.id === taskId) {
      setActiveTask(updatedTask);
    }
  };
  
  // Filtered tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return !task.completedAt;
    return !!task.completedAt;
  });

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center pt-24 pb-32">
        <motion.div 
          className="container mx-auto px-4 max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-orange-800">Task Breaker</h1>
            <p className="mx-auto max-w-2xl mb-8 text-lg text-neutral-grey_1">
              Break down overwhelming tasks into small, manageable steps. Designed specifically for individuals with ADHD to reduce task anxiety and increase productivity.
            </p>
            
            {/* Confetti Effect */}
            {showConfetti && (
              <div className="confetti-container fixed inset-0 pointer-events-none z-50">
                {Array.from({ length: 100 }).map((_, i) => {
                  const size = Math.random() * 10 + 5;
                  const left = Math.random() * 100;
                  const animationDuration = Math.random() * 3 + 2;
                  const delay = Math.random() * 0.5;
                  const color = [
                    '#FF8F00', '#FFD700', '#FF4500', 
                    '#9370DB', '#4169E1', '#32CD32'
                  ][Math.floor(Math.random() * 6)];
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-sm"
                      style={{
                        left: `${left}%`,
                        top: '-20px',
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        originX: 0.5,
                        originY: 0.5
                      }}
                      initial={{ y: -50, rotate: 0 }}
                      animate={{
                        y: window.innerHeight + 50,
                        x: Math.sin(left) * 200,
                        rotate: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
                        opacity: [1, 1, 0]
                      }}
                      transition={{
                        duration: animationDuration,
                        delay: delay,
                        ease: "easeOut"
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Tasks List Column */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-orange-600">My Tasks</h2>
                <motion.button
                  onClick={() => setShowNewTaskForm(true)}
                  className="p-2 bg-orange-800 text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  + New Task
                </motion.button>
              </div>
              
              {/* Task Filters */}
              <div className="flex mb-4 bg-background-secondary rounded-lg p-1">
                {(['all', 'active', 'completed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                      filterStatus === status 
                        ? 'bg-orange-800 text-white' 
                        : 'text-neutral-grey_1 hover:text-white'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Tasks List */}
              <div className="bg-background-secondary rounded-xl p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                {filteredTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-neutral-grey_1">
                    <p className="mb-4">No tasks found</p>
                    <motion.button
                      onClick={() => setShowNewTaskForm(true)}
                      className="px-4 py-2 bg-orange-800 text-white rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Create your first task
                    </motion.button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    <AnimatePresence>
                      {filteredTasks.map((task, index) => (
                        <motion.li
                          key={task.id}
                          className={`bg-background-primary p-3 rounded-lg cursor-pointer ${
                            activeTask?.id === task.id ? 'border-2 border-orange-500' : ''
                          } ${task.completedAt ? 'opacity-70' : ''}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setActiveTask(task)}
                          layout
                        >
                          <div className="flex justify-between">
                            <div className="flex items-start">
                              <div 
                                className={`mt-1 mr-2 w-4 h-4 rounded-full flex-shrink-0 border ${
                                  task.completedAt 
                                    ? 'bg-green-500 border-green-500' 
                                    : 'border-neutral-grey_1'
                                }`}
                              >
                                {task.completedAt && (
                                  <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h3 className={`font-medium ${task.completedAt ? 'line-through text-neutral-grey_1' : ''}`}>
                                  {task.title}
                                </h3>
                                <p className="text-xs text-neutral-grey_1">
                                  {task.steps.length} steps • {task.steps.filter(s => s.isCompleted).length} completed
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTaskExpand(task.id);
                                }}
                                className="p-1 text-neutral-grey_1 hover:text-white transition-colors"
                              >
                                {task.isExpanded ? '▲' : '▼'}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteTask(task.id);
                                }}
                                className="p-1 text-neutral-grey_1 hover:text-red-500 transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          
                          {/* Task Steps Preview */}
                          {task.isExpanded && task.steps.length > 0 && (
                            <div className="mt-3 ml-6 space-y-1">
                              {task.steps.slice(0, 3).map((step) => (
                                <div 
                                  key={step.id}
                                  className={`text-sm ${step.isCompleted ? 'line-through text-neutral-grey_1' : ''}`}
                                >
                                  • {step.text}
                                </div>
                              ))}
                              {task.steps.length > 3 && (
                                <div className="text-xs text-neutral-grey_1">
                                  + {task.steps.length - 3} more steps
                                </div>
                              )}
                            </div>
                          )}
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>
              
              {/* Task Stats */}
              <div className="bg-background-secondary rounded-xl p-4 mt-4">
                <h3 className="text-lg font-semibold mb-3">Progress</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background-primary p-3 rounded-lg">
                    <p className="text-neutral-grey_1 text-sm">Completed</p>
                    <p className="text-2xl font-bold">
                      {tasks.filter(t => t.completedAt).length}/{tasks.length}
                    </p>
                  </div>
                  <div className="bg-background-primary p-3 rounded-lg">
                    <p className="text-neutral-grey_1 text-sm">Completion Rate</p>
                    <p className="text-2xl font-bold">
                      {tasks.length 
                        ? Math.round((tasks.filter(t => t.completedAt).length / tasks.length) * 100)
                        : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Task Detail Column */}
            <div className="md:col-span-7 lg:col-span-8">
              {!activeTask ? (
                <div className="bg-background-secondary rounded-xl h-full flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-xl font-bold mb-3">Task Breakdown</h3>
                  <p className="text-neutral-grey_1 mb-6 max-w-md">
                    Select a task from the list or create a new one to break it down into manageable steps.
                  </p>
                  <motion.button
                    onClick={() => setShowNewTaskForm(true)}
                    className="px-6 py-3 bg-orange-800 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create New Task
                  </motion.button>
                </div>
              ) : (
                <div className="bg-background-secondary rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-2xl font-bold">{activeTask.title}</h2>
                        {activeTask.completedAt && (
                          <motion.span 
                            className="ml-3 px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            Completed
                          </motion.span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-grey_1">
                        Created {new Date(activeTask.createdAt).toLocaleDateString()} 
                        {activeTask.completedAt && ` • Completed ${new Date(activeTask.completedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => setShowAddStepForm(true)}
                        className="px-4 py-2 bg-orange-800 text-white rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add Step
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {activeTask.steps.filter(s => s.isCompleted).length}/{activeTask.steps.length} steps completed
                      </span>
                    </div>
                    <div className="h-2 bg-background-primary rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-orange-600"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeTask.steps.length
                            ? `${(activeTask.steps.filter(s => s.isCompleted).length / activeTask.steps.length) * 100}%`
                            : '0%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  {/* Steps List */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Steps</h3>
                    
                    {activeTask.steps.length === 0 ? (
                      <div className="bg-background-primary p-6 rounded-lg text-center">
                        <p className="text-neutral-grey_1 mb-4">
                          No steps added yet. Break down this task into smaller, manageable steps.
                        </p>
                        <motion.button
                          onClick={() => setShowAddStepForm(true)}
                          className="px-4 py-2 bg-orange-800 text-white rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add First Step
                        </motion.button>
                      </div>
                    ) : (
                      <motion.ul 
                        className="space-y-3 max-h-[400px] overflow-y-auto pr-2"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { 
                            opacity: 1,
                            transition: { staggerChildren: 0.07 }
                          }
                        }}
                        initial="hidden"
                        animate="visible"
                      >
                        {activeTask.steps.map((step, index) => (
                          <motion.li
                            key={step.id}
                            className={`bg-background-primary p-4 rounded-lg flex items-start ${
                              step.isCompleted ? 'opacity-70' : ''
                            }`}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            layout
                          >
                            <button
                              onClick={() => toggleStepCompletion(activeTask.id, step.id)}
                              className={`mt-1 mr-3 w-5 h-5 rounded-full flex-shrink-0 border ${
                                step.isCompleted 
                                  ? 'bg-green-500 border-green-500' 
                                  : 'border-neutral-grey_1'
                              }`}
                            >
                              {step.isCompleted && (
                                <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </button>
                            <div className="flex-grow">
                              <p className={step.isCompleted ? 'line-through text-neutral-grey_1' : ''}>
                                {step.text}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              <button
                                onClick={() => moveStep(activeTask.id, step.id, 'up')}
                                disabled={index === 0}
                                className={`p-1 ${
                                  index === 0 ? 'text-neutral-grey_2' : 'text-neutral-grey_1 hover:text-white'
                                } transition-colors`}
                              >
                                ▲
                              </button>
                              <button
                                onClick={() => moveStep(activeTask.id, step.id, 'down')}
                                disabled={index === activeTask.steps.length - 1}
                                className={`p-1 ${
                                  index === activeTask.steps.length - 1 
                                    ? 'text-neutral-grey_2' 
                                    : 'text-neutral-grey_1 hover:text-white'
                                } transition-colors`}
                              >
                                ▼
                              </button>
                              <button
                                onClick={() => deleteStep(activeTask.id, step.id)}
                                className="p-1 text-neutral-grey_1 hover:text-red-500 transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                  
                  {/* Tips */}
                  <div className="bg-background-primary rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Tips for Breaking Down Tasks</h3>
                    <ul className="text-sm text-neutral-grey_1 space-y-1 list-disc list-inside">
                      <li>Make each step specific and actionable</li>
                      <li>Start with the smallest possible step to build momentum</li>
                      <li>Use clear, concrete language ("Write intro paragraph" vs "Start writing")</li>
                      <li>Keep steps small enough to complete in 5-15 minutes</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* New Task Modal */}
        <AnimatePresence>
          {showNewTaskForm && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewTaskForm(false)}
            >
              <motion.div 
                className="bg-background-secondary p-8 rounded-xl shadow-2xl max-w-md w-full"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-orange-500 mb-6">Create New Task</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-neutral-grey_1 mb-2">
                      Task Name
                    </label>
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="What do you need to accomplish?"
                      className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none"
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <motion.button
                      onClick={() => setShowNewTaskForm(false)}
                      className="px-6 py-3 bg-background-primary text-neutral-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={createTask}
                      disabled={!newTaskTitle.trim()}
                      className={`px-6 py-3 bg-gradient-to-r from-orange-800 to-orange-500 text-white rounded-lg font-medium ${
                        !newTaskTitle.trim() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      whileHover={newTaskTitle.trim() ? { scale: 1.05 } : {}}
                      whileTap={newTaskTitle.trim() ? { scale: 0.95 } : {}}
                    >
                      Create Task
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Step Modal */}
        <AnimatePresence>
          {showAddStepForm && activeTask && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddStepForm(false)}
            >
              <motion.div 
                className="bg-background-secondary p-8 rounded-xl shadow-2xl max-w-md w-full"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-orange-500 mb-3">Add Steps to Task</h2>
                <p className="text-neutral-grey_1 mb-6">
                  Breaking "{activeTask.title}" into smaller steps
                </p>
                
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <button
                      onClick={() => setBulkMode(false)}
                      className={`px-4 py-2 rounded-lg ${
                        !bulkMode 
                          ? 'bg-orange-800 text-white' 
                          : 'bg-background-primary text-neutral-grey_1'
                      }`}
                    >
                      Single Step
                    </button>
                    <button
                      onClick={() => setBulkMode(true)}
                      className={`px-4 py-2 rounded-lg ${
                        bulkMode 
                          ? 'bg-orange-800 text-white' 
                          : 'bg-background-primary text-neutral-grey_1'
                      }`}
                    >
                      Multiple Steps
                    </button>
                  </div>
                  
                  {bulkMode ? (
                    <div>
                      <label className="block text-neutral-grey_1 mb-2">
                        Add Multiple Steps (one per line)
                      </label>
                      <textarea
                        value={bulkSteps}
                        onChange={(e) => setBulkSteps(e.target.value)}
                        placeholder="Enter steps, one per line:
1. First step
2. Second step
3. And so on..."
                        className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none h-40 resize-none"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-neutral-grey_1 mb-2">
                        Step Description
                      </label>
                      <input
                        type="text"
                        value={newStepText}
                        onChange={(e) => setNewStepText(e.target.value)}
                        placeholder="What's a small, specific action you can take?"
                        className="w-full rounded-lg border border-neutral-grey_2 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none"
                        autoFocus
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <motion.button
                      onClick={() => setShowAddStepForm(false)}
                      className="px-6 py-3 bg-background-primary text-neutral-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={addStep}
                      disabled={bulkMode ? !bulkSteps.trim() : !newStepText.trim()}
                      className={`px-6 py-3 bg-gradient-to-r from-orange-800 to-orange-500 text-white rounded-lg font-medium ${
                        (bulkMode ? !bulkSteps.trim() : !newStepText.trim()) 
                          ? 'opacity-50 cursor-not-allowed' 
                          : ''
                      }`}
                      whileHover={(bulkMode ? bulkSteps.trim() : newStepText.trim()) ? { scale: 1.05 } : {}}
                      whileTap={(bulkMode ? bulkSteps.trim() : newStepText.trim()) ? { scale: 0.95 } : {}}
                    >
                      Add {bulkMode ? 'Steps' : 'Step'}
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