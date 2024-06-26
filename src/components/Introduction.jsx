import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@fontsource/lora'; // Import Lora font
import '@fontsource/roboto'; // Import Roboto font

const Introduction = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideIn = {
    hidden: { x: '-100%' },
    visible: { x: '0%', transition: { duration: 1 } },
  };

  return (
    <div style={styles.home}>
      <motion.h1 initial="hidden" animate="visible" variants={fadeIn} style={styles.heading}>
        Welcome to our Coffee Store
      </motion.h1>
      <motion.p initial="hidden" animate="visible" variants={slideIn} style={styles.paragraph}>
        Order the drink you want!
      </motion.p>
      <div style={styles.buttons}>
        <button
          style={hovered === 'signup' ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHovered('signup')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
        <button
          style={hovered === 'login' ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHovered('login')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/login')}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

const styles = {
  home: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#DDB892', // Light coffee color
    color: '#3E2723', // Dark coffee color for text
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif', // Default font
  },
  heading: {
    fontSize: '3em',
    marginBottom: '0.5em',
    fontFamily: 'Lora, serif', // Font for heading
  },
  paragraph: {
    fontSize: '1.5em',
    marginBottom: '2em',
  },
  buttons: {
    display: 'flex',
    gap: '1em',
  },
  button: {
    padding: '0.75em 1.5em',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#6f4e37',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Roboto, sans-serif', // Font for buttons
  },
  buttonHover: {
    backgroundColor: '#3e2723',
  },
};

export default Introduction;
