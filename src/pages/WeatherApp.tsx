import { ReactElement, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  weather: string;
  weatherIcon: string;
  humidity: number;
  wind: number;
  time: string;
  isDay: boolean;
}

// Mock weather data for demonstration purposes
const demoLocations = [
  {
    city: 'Paris',
    country: 'FR',
    temperature: 18,
    weather: 'Partly Cloudy',
    weatherIcon: '🌤️',
    humidity: 65,
    wind: 12,
    time: '14:30',
    isDay: true
  },
  {
    city: 'Tokyo',
    country: 'JP',
    temperature: 28,
    weather: 'Sunny',
    weatherIcon: '☀️',
    humidity: 40,
    wind: 8,
    time: '21:30',
    isDay: false
  },
  {
    city: 'New York',
    country: 'US',
    temperature: 12,
    weather: 'Rainy',
    weatherIcon: '🌧️',
    humidity: 85,
    wind: 18,
    time: '09:30',
    isDay: true
  },
  {
    city: 'Sydney',
    country: 'AU',
    temperature: 24,
    weather: 'Sunny',
    weatherIcon: '☀️',
    humidity: 50,
    wind: 15,
    time: '17:30',
    isDay: true
  },
  {
    city: 'London',
    country: 'UK',
    temperature: 10,
    weather: 'Foggy',
    weatherIcon: '🌫️',
    humidity: 90,
    wind: 6,
    time: '13:30',
    isDay: true
  },
  {
    city: 'Dubai',
    country: 'AE',
    temperature: 36,
    weather: 'Clear',
    weatherIcon: '☀️',
    humidity: 30,
    wind: 10,
    time: '16:30',
    isDay: true
  },
  {
    city: 'Moscow',
    country: 'RU',
    temperature: -5,
    weather: 'Snowy',
    weatherIcon: '❄️',
    humidity: 75,
    wind: 20,
    time: '12:30',
    isDay: true
  },
  {
    city: 'Rio de Janeiro',
    country: 'BR',
    temperature: 30,
    weather: 'Partly Cloudy',
    weatherIcon: '🌤️',
    humidity: 70,
    wind: 14,
    time: '11:30',
    isDay: true
  },
  {
    city: 'Seoul',
    country: 'KR',
    temperature: 15,
    weather: 'Cloudy',
    weatherIcon: '☁️',
    humidity: 60,
    wind: 9,
    time: '20:30',
    isDay: false
  },
  {
    city: 'Cape Town',
    country: 'ZA',
    temperature: 22,
    weather: 'Clear',
    weatherIcon: '☀️',
    humidity: 55,
    wind: 16,
    time: '15:30',
    isDay: true
  }
];

export default function WeatherApp(): ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [savedLocations, setSavedLocations] = useState<WeatherData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<WeatherData[]>([]);
  const [error, setError] = useState('');

  // Initialize with Paris weather
  useEffect(() => {
    setCurrentWeather(demoLocations[0]);
    // Add some saved locations for demo
    setSavedLocations([demoLocations[1], demoLocations[2], demoLocations[3]]);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.length > 1) {
      // Filter locations that match the search term
      const filteredLocations = demoLocations.filter(
        location => location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredLocations);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setError('Please enter a city name');
      return;
    }

    const foundLocation = demoLocations.find(
      location => location.city.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundLocation) {
      setCurrentWeather(foundLocation);
      setError('');
      setSearchTerm('');
      setShowSuggestions(false);
    } else {
      setError('City not found. Try another location.');
    }
  };

  const selectLocation = (location: WeatherData) => {
    setCurrentWeather(location);
    setSearchTerm('');
    setShowSuggestions(false);
    setError('');
  };

  const saveLocation = (location: WeatherData) => {
    if (!savedLocations.some(saved => saved.city === location.city)) {
      setSavedLocations([...savedLocations, location]);
    }
  };

  const removeLocation = (locationToRemove: WeatherData) => {
    setSavedLocations(savedLocations.filter(location => 
      location.city !== locationToRemove.city
    ));
  };

  // Determine background gradient based on weather and time
  const getBackgroundGradient = (weather?: string, isDay?: boolean) => {
    if (!weather || isDay === undefined) return 'from-blue-900 to-blue-700';
    
    if (!isDay) return 'from-blue-900 to-indigo-900'; // Night
    
    switch(weather.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'from-blue-500 to-sky-300';
      case 'partly cloudy':
        return 'from-blue-600 to-blue-400';
      case 'cloudy':
        return 'from-gray-500 to-gray-400';
      case 'rainy':
        return 'from-blue-700 to-gray-600';
      case 'foggy':
        return 'from-gray-400 to-gray-300';
      case 'snowy':
        return 'from-gray-300 to-blue-200';
      default:
        return 'from-blue-600 to-blue-400';
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center pt-24 pb-32">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-orange-800">Weather App</h1>
            <p className="mx-auto max-w-2xl mb-6 text-lg text-neutral-grey_1">
              Check current weather conditions around the world. Search for a city to get started.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-12">
              <div className="flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for a city..."
                  className="w-full px-4 py-2 rounded-l-lg bg-background-secondary border border-neutral-grey_2 text-white focus:outline-none focus:border-orange-500"
                />
                <motion.button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-orange-800 rounded-r-lg text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </div>
              
              {/* Error message */}
              {error && (
                <motion.p 
                  className="text-red-500 text-sm mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
              
              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div 
                    className="absolute z-10 mt-1 w-full bg-background-secondary rounded-lg border border-neutral-grey_2 shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <motion.li 
                          key={index}
                          className="px-4 py-2 hover:bg-background-primary cursor-pointer flex items-center"
                          onClick={() => selectLocation(suggestion)}
                          whileHover={{ x: 5 }}
                        >
                          <span className="mr-2">{suggestion.weatherIcon}</span>
                          <span>{suggestion.city}, {suggestion.country}</span>
                          <span className="ml-auto">{suggestion.temperature}°C</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Weather Display */}
            <div className="lg:col-span-2">
              {currentWeather && (
                <motion.div 
                  className={`bg-gradient-to-br ${getBackgroundGradient(currentWeather.weather, currentWeather.isDay)} rounded-xl p-8 text-white shadow-xl`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{currentWeather.city}</h2>
                      <p className="text-xl opacity-90">{currentWeather.country}</p>
                      <p className="opacity-75 mt-1">{currentWeather.time}</p>
                    </div>
                    <motion.button
                      onClick={() => saveLocation(currentWeather)}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={savedLocations.some(saved => saved.city === currentWeather.city)}
                    >
                      {savedLocations.some(saved => saved.city === currentWeather.city) ? 
                        '★' : '☆'}
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center">
                      <span className="text-7xl mr-4">{currentWeather.weatherIcon}</span>
                      <div>
                        <h3 className="text-5xl font-bold">{currentWeather.temperature}°C</h3>
                        <p className="text-xl">{currentWeather.weather}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <p className="opacity-80">Humidity</p>
                        <p className="text-xl font-bold">{currentWeather.humidity}%</p>
                      </div>
                      <div className="bg-white/20 px-4 py-2 rounded-lg">
                        <p className="opacity-80">Wind</p>
                        <p className="text-xl font-bold">{currentWeather.wind} km/h</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Saved Locations */}
            <div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Saved Locations</h3>
              {savedLocations.length === 0 ? (
                <p className="text-neutral-grey_1">No saved locations yet. Search for a city and save it to add it here.</p>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {savedLocations.map((location, index) => (
                      <motion.div 
                        key={location.city}
                        className={`bg-gradient-to-r ${getBackgroundGradient(location.weather, location.isDay)} rounded-lg p-4 text-white flex justify-between items-center`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center cursor-pointer" onClick={() => selectLocation(location)}>
                          <span className="text-3xl mr-3">{location.weatherIcon}</span>
                          <div>
                            <h4 className="font-bold">{location.city}</h4>
                            <p className="text-sm opacity-90">{location.weather}</p>
                          </div>
                          <p className="ml-8 text-2xl font-bold">{location.temperature}°C</p>
                        </div>
                        <motion.button
                          onClick={() => removeLocation(location)}
                          className="p-1 bg-white/20 rounded-full hover:bg-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ✕
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}