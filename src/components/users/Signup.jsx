import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseconfig';
import { addDoc, collection } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [signupInput, setSignupInput] = useState({
        email: '',
        password: '',
        fullname: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const interval = setInterval(() => {
                    user.reload().then(() => {
                        if (user.emailVerified) {
                            clearInterval(interval);
                            navigate('/product');
                        }
                    });
                }, 1000);

                return () => clearInterval(interval);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignupInputChange = (e) => {
        const newData = { ...signupInput, [e.target.name]: e.target.value };
        setSignupInput(newData);
    };

    const [inputErrors, setInputErrors] = useState({
        email: '',
        password: '',
        fullname: '',
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        let flag = true;

        if (!signupInput.fullname) {
            setInputErrors(prev => ({ ...prev, fullname: 'Full name is required' }));
            flag = false;
        } else {
            setInputErrors(prev => ({ ...prev, fullname: '' }));
        }

        if (!validateEmail(signupInput.email)) {
            setInputErrors(prev => ({ ...prev, email: 'Invalid email' }));
            flag = false;
        } else {
            setInputErrors(prev => ({ ...prev, email: '' }));
        }

        if (!validatePassword(signupInput.password)) {
            setInputErrors(prev => ({
                ...prev,
                password: 'Password must contain at least 8 characters, one capital letter, one lowercase letter, a number, and a special character'
            }));
            flag = false;
        } else {
            setInputErrors(prev => ({ ...prev, password: '' }));
        }

        if (flag) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, signupInput.email, signupInput.password);
                const user = userCredential.user;

                await addDoc(collection(db, "usersInfo"), {
                    fullname: signupInput.fullname,
                    email: signupInput.email,
                    userRole : 'customer',
                    uid: user.uid,
                });

                await sendEmailVerification(user);
                alert('Verification email sent. Please check your inbox.');
            } catch (error) {
                console.error("Error during signup: ", error);
                alert(`Error during signup: ${error.message}`);
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3E5AB', width: '100%', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <motion.form 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px', textAlign: 'center' }}
                onSubmit={handleSignup}
            >
                <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: '#8B4513' }}>Join Our Coffee Store Member</h2>
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#6B4226' }}>Full Name:</p>
                    <input 
                        name='fullname' 
                        value={signupInput.fullname} 
                        style={{ width: '100%', height: '40px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #CCC', padding: '0 10px' }} 
                        onChange={handleSignupInputChange} 
                    />
                    <div style={{ color: 'red', marginBottom: '10px' }}>{inputErrors.fullname}</div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#6B4226' }}>Email:</p>
                    <input 
                        name='email' 
                        value={signupInput.email} 
                        style={{ width: '100%', height: '40px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #CCC', padding: '0 10px' }} 
                        onChange={handleSignupInputChange} 
                    />
                    <div style={{ color: 'red', marginBottom: '10px' }}>{inputErrors.email}</div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                >
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#6B4226' }}>Password:</p>
                    <input 
                        type='password' 
                        name='password' 
                        value={signupInput.password} 
                        style={{ width: '100%', height: '40px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #CCC', padding: '0 10px' }} 
                        onChange={handleSignupInputChange} 
                    />
                    <div style={{ color: 'red', marginBottom: '20px' }}>{inputErrors.password}</div>
                </motion.div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%', height: '40px', backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
                    type="submit"
                >
                    Sign Up
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%', height: '40px', backgroundColor: '#6f4e37', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
                    onClick={() => navigate('/introduction')}
                >
                    Back to Home
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%', height: '40px', backgroundColor: '#6f4e37', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={() => navigate('/login')}
                >
                    Already have an account? Sign In
                </motion.button>
            </motion.form>
        </div>
    );
};

export default Signup;
