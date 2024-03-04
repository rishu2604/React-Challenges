import { useContext, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';
import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  // To imperatively animate our app
  // First element 'scope' is a 'ref' which can be passed as a prop to elements
  // 'animate' is a function which is triggered to imperatively animate our app
  const [ scope, animate ] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if(!challenge.title.trim() || !challenge.description.trim() || 
      !challenge.deadline.trim() || !challenge.image)
    {
      // we can pass elements as a string in animate
      // use CSS selectors to target the elements
      // or you can use className too
      animate('input, textarea', {x: [-10, 0, 10, 0]}, {type: 'spring', duration: stagger(0.04)})
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul 
          id="new-challenge-images" 
          variants={{visible: {transition: {staggerChildren: 0.07}}}}
        >
          {images.map((image) => (
            <motion.li
              // which variant must be used at which state will be pass by the parent component i.e. Modal component in our case
              variants={{
                hidden: {opacity: 0, scale: 0.5}, 
                visible: {opacity: 1, scale: [0.8, 1.3, 1]}
                // we can also set an array of values which will act as keyframes
                // i.e it will go through these values of the array
              }}
              exit={{opacity: 1, scale: 1}}
              transition={{type: 'spring'}}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
