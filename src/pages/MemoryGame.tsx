import { ReactElement, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

// Define card interface
interface Card {
  id: number;
  matched: boolean;
  flipped: boolean;
  icon: string;
}

// Icons for cards
const icons = [
  '🚀', '🌟', '🌈', '🎮', '🎨', '🎵', '🍕', '🏆',
  '🦄', '🌍', '🏖️', '💎'
];

export default function MemoryGame(): ReactElement {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Create and shuffle cards based on difficulty
  const createCards = (difficulty: 'easy' | 'medium' | 'hard') => {
    let selectedIcons: string[];
    
    switch(difficulty) {
      case 'easy':
        selectedIcons = icons.slice(0, 6);
        break;
      case 'medium':
        selectedIcons = icons.slice(0, 8);
        break;
      case 'hard':
        selectedIcons = icons.slice(0, 12);
        break;
      default:
        selectedIcons = icons.slice(0, 8);
    }
    
    // Create pairs of cards
    const cardPairs = [...selectedIcons, ...selectedIcons]
      .map((icon, index) => ({
        id: index,
        matched: false,
        flipped: false,
        icon
      }));
    
    // Shuffle cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5);
    
    return shuffledCards;
  };

  // Start new game
  const startNewGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(difficulty);
    setFirstChoice(null);
    setSecondChoice(null);
    setCards(createCards(difficulty));
    setTurns(0);
    setMatches(0);
    setGameWon(false);
  };

  // Handle card click
  const handleChoice = (card: Card) => {
    if (disabled || card.flipped || card.matched) return;
    
    // Flip the card
    const updatedCards = cards.map(c => 
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // Effect for checking matches
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      
      if (firstChoice.icon === secondChoice.icon) {
        // We have a match
        setMatches(prev => prev + 1);
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === firstChoice.id || card.id === secondChoice.id 
              ? { ...card, matched: true } 
              : card
          )
        );
        resetTurn();
      } else {
        // Not a match, flip back after delay
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === firstChoice.id || card.id === secondChoice.id 
                ? { ...card, flipped: false } 
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Reset choices & increase turn count
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  // Check if game is won
  useEffect(() => {
    const pairsToMatch = difficulty === 'easy' ? 6 : (difficulty === 'medium' ? 8 : 12);
    if (matches === pairsToMatch) {
      setGameWon(true);
    }
  }, [matches, difficulty]);

  // Start game on component mount
  useEffect(() => {
    startNewGame('medium');
  }, []);

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
            <h1 className="mb-4 text-4xl font-bold text-orange-800">Memory Game</h1>
            <p className="mx-auto max-w-2xl mb-8 text-lg text-neutral-grey_1">
              Test your memory by matching pairs of cards. Click on a card to flip it and find its match.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.button
                onClick={() => startNewGame('easy')}
                className={`px-6 py-2 rounded-lg font-medium ${difficulty === 'easy' ? 'bg-orange-800 text-white' : 'bg-background-secondary text-neutral-grey_1'}`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Easy
              </motion.button>
              <motion.button
                onClick={() => startNewGame('medium')}
                className={`px-6 py-2 rounded-lg font-medium ${difficulty === 'medium' ? 'bg-orange-800 text-white' : 'bg-background-secondary text-neutral-grey_1'}`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Medium
              </motion.button>
              <motion.button
                onClick={() => startNewGame('hard')}
                className={`px-6 py-2 rounded-lg font-medium ${difficulty === 'hard' ? 'bg-orange-800 text-white' : 'bg-background-secondary text-neutral-grey_1'}`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Hard
              </motion.button>
            </div>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-medium text-neutral-white">Turns</h3>
                <p className="text-4xl font-bold text-orange-500">{turns}</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-neutral-white">Matches</h3>
                <p className="text-4xl font-bold text-orange-500">{matches}</p>
              </div>
            </div>
          </div>

          <div className={`grid gap-4 mx-auto max-w-5xl
            ${difficulty === 'easy' ? 'grid-cols-3 sm:grid-cols-4' : 
            difficulty === 'medium' ? 'grid-cols-3 sm:grid-cols-4' : 
            'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'}`}
          >
            {cards.map(card => (
              <motion.div 
                key={card.id}
                onClick={() => handleChoice(card)}
                className={`relative cursor-pointer bg-background-secondary aspect-square flex items-center justify-center rounded-xl text-4xl shadow-md overflow-hidden
                  ${card.matched ? 'opacity-70' : ''}`}
                whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : {}}
                whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
              >
                <div className="relative w-full h-full">
                  {/* Front side */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-700 to-orange-900 rounded-xl"
                    initial={{ rotateY: 0 }}
                    animate={{ 
                      rotateY: card.flipped ? 180 : 0,
                      opacity: card.flipped ? 0 : 1
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <span className="text-2xl text-orange-800">?</span>
                  </motion.div>
                  
                  {/* Back side with icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-background-primary rounded-xl"
                    initial={{ rotateY: 180 }}
                    animate={{ 
                      rotateY: card.flipped ? 0 : 180,
                      opacity: card.flipped ? 1 : 0
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <span className="text-3xl">{card.icon}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Victory Modal */}
          <AnimatePresence>
            {gameWon && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setGameWon(false)}
              >
                <motion.div 
                  className="bg-background-secondary p-8 rounded-xl shadow-2xl max-w-md text-center"
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                  onClick={e => e.stopPropagation()}
                >
                  <h2 className="text-3xl font-bold text-orange-500 mb-4">Congratulations! 🎉</h2>
                  <p className="text-xl mb-6">You completed the game in {turns} turns!</p>
                  <div className="flex justify-center gap-4">
                    <motion.button
                      onClick={() => {
                        setGameWon(false);
                        startNewGame(difficulty);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-orange-800 to-orange-500 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play Again
                    </motion.button>
                    <motion.button
                      onClick={() => setGameWon(false)}
                      className="px-6 py-3 bg-background-primary text-neutral-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Layout>
  );
}