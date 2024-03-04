import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter(
      (challenge) => challenge.status === 'completed'
    ),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
        // To animate the disappearance of an element, we need to wrap the component between AnimatePresence because else react would instantly removes or unmounts the component. 
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {/* As we have two elements here i.e ordered list and a paragraph and we have to consitionally render both, we need to define a key here so that framer motion knows that they are apart */}
        {/* We need a key in AnimatePresence if it has multiple children */}
        <AnimatePresence mode='wait'> 
        {/* By default the 'mode' is 'sync' */}
        {/* Now it waits for the first element to disappear before applying animation to the other */}
          {displayedChallenges.length > 0 && (
            <motion.ol 
              key="list" 
              className="challenge-items" 
              initial={{opacity: 0, y: -20}}
              animate={{opacity:1, y: 0}}
              exit={{y: -30, opacity: 0}}
            >
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
          {displayedChallenges.length === 0 && <motion.p 
              key="fallback-text" 
              initial={{opacity: 0, y: -20}}
              animate={{opacity:1, y: 0}}
              exit={{opacity: 0, y: -20}}
            >
              No challenges found.
            </motion.p>}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
