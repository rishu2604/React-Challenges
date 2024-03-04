import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button 
          onClick={handleStartAddNewChallenge} 
          className="button"
          whileHover={{scale: 1.1}} // we can also add color here backgroundColor: '#8b5444'
          transition={{type: 'spring', stiffness: 500}} // we can also add {mass: 100} property here
        >
            Add Challenge
        </motion.button>
      </header>
    </>
  );
}
