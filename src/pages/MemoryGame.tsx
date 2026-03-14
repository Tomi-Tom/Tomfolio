import { ReactElement, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../layouts/PageLayout';

interface Card {
  id: number;
  matched: boolean;
  flipped: boolean;
  icon: string;
}

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

    const cardPairs = [...selectedIcons, ...selectedIcons]
      .map((icon, index) => ({
        id: index,
        matched: false,
        flipped: false,
        icon
      }));

    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5);

    return shuffledCards;
  };

  const startNewGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(difficulty);
    setFirstChoice(null);
    setSecondChoice(null);
    setCards(createCards(difficulty));
    setTurns(0);
    setMatches(0);
    setGameWon(false);
  };

  const handleChoice = (card: Card) => {
    if (disabled || card.flipped || card.matched) return;

    // Flip the card
    const updatedCards = cards.map(c =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

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

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    const pairsToMatch = difficulty === 'easy' ? 6 : (difficulty === 'medium' ? 8 : 12);
    if (matches === pairsToMatch) {
      setGameWon(true);
    }
  }, [matches, difficulty]);

  useEffect(() => {
    startNewGame('medium');
  }, []);

  return (
    <PageLayout>
      <div className="flex min-h-screen flex-col items-center pt-24 pb-32" style={{ background: 'var(--color-void)' }}>
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gold">Memory Game</h1>
            <p className="mx-auto max-w-2xl mb-8 text-lg text-secondary">
              Test your memory by matching pairs of cards. Click on a card to flip it and find its match.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.button
                onClick={() => startNewGame('easy')}
                className={difficulty === 'easy' ? 'btn-gold' : 'btn-ghost-gold'}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Easy
              </motion.button>
              <motion.button
                onClick={() => startNewGame('medium')}
                className={difficulty === 'medium' ? 'btn-gold' : 'btn-ghost-gold'}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Medium
              </motion.button>
              <motion.button
                onClick={() => startNewGame('hard')}
                className={difficulty === 'hard' ? 'btn-gold' : 'btn-ghost-gold'}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Hard
              </motion.button>
            </div>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-medium text-secondary">Turns</h3>
                <p className="text-4xl font-bold text-gold">{turns}</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-secondary">Matches</h3>
                <p className="text-4xl font-bold text-gold">{matches}</p>
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
                className={`relative cursor-pointer aspect-square flex items-center justify-center rounded-xl text-4xl overflow-hidden ${card.matched ? 'opacity-70' : ''}`}
                style={{
                  background: 'var(--color-void-surface)',
                  border: '1px solid var(--color-border)',
                }}
                whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : {}}
                whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
              >
                <div className="relative w-full h-full">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-void-elevated), var(--color-void-surface))',
                      border: '1px solid var(--color-border-active)',
                    }}
                    initial={{ rotateY: 0 }}
                    animate={{
                      rotateY: card.flipped ? 180 : 0,
                      opacity: card.flipped ? 0 : 1
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <span className="text-6xl text-gold-dim">?</span>
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-xl"
                    style={{
                      background: card.matched ? 'var(--color-gold-ghost)' : 'var(--color-void-elevated)',
                    }}
                    initial={{ rotateY: 180 }}
                    animate={{
                      rotateY: card.flipped ? 0 : 180,
                      opacity: card.flipped ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <span className="text-6xl">{card.icon}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {gameWon && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setGameWon(false)}
              >
                <motion.div
                  className="void-panel p-8 rounded-xl max-w-md text-center"
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                  onClick={e => e.stopPropagation()}
                >
                  <h2 className="text-3xl font-bold text-gold mb-4">Congratulations!</h2>
                  <p className="text-xl mb-6 text-secondary">You completed the game in <span className="text-gold">{turns}</span> turns!</p>
                  <div className="flex justify-center gap-4">
                    <motion.button
                      onClick={() => {
                        setGameWon(false);
                        startNewGame(difficulty);
                      }}
                      className="btn-gold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Play Again
                    </motion.button>
                    <motion.button
                      onClick={() => setGameWon(false)}
                      className="btn-ghost-gold"
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
    </PageLayout>
  );
}
