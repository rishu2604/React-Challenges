import { createPortal } from 'react-dom';
import{ motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  // const hiddenAnimationState = {opacity: 0, y: 30};   
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog 
        variants={{
          hidden: {opacity: 0, y: 30},
          visible: {opacity: 1, y: 0}
        }}
        open 
        className="modal"
        initial="hidden" // allows us to set an initial state and if the component deviate from that state, it will fire the animation prop
        animate="visible"
        // We can't apply the exit property of framer motion directly, instead we have to use animate presence method provided by framer motion
        // Because as soon as we exit, the react instantly unmounts the component
        exit="hidden"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
