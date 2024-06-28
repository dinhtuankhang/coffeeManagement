import React, { useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { auth, db } from '../../firebaseconfig';
import { motion } from 'framer-motion';

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleLoginInputChange = (e) => {
        const newData = { ...loginInput, [e.target.name]: e.target.value };
        setLoginInput(newData);
    };

    const [loginInputErrors, setLoginInputErrors] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        let flag = true;
        if (!loginInput.email) {
            setLoginInputErrors(prev => ({ ...prev, email: 'Please type your email' }));
            flag = false;
        } else {
            setLoginInputErrors(prev => ({ ...prev, email: '' }));
        }
        if (!loginInput.password) {
            setLoginInputErrors(prev => ({ ...prev, password: 'Please type your password' }));
            flag = false;
        } else {
            setLoginInputErrors(prev => ({ ...prev, password: '' }));
        }

        if (flag) {
            try {
                await setPersistence(auth, browserSessionPersistence);
                const userCredential = await signInWithEmailAndPassword(auth, loginInput.email, loginInput.password);
                const user = userCredential.user;
                const userCollection = collection(db, 'usersInfo');
                const userQuery = query(userCollection, where("uid", "==", user.uid));
                const docs = await getDocs(userQuery);
                let currentUser;
                docs.forEach((doc) => {
                    currentUser = doc.data();
                });
                if(currentUser.userRole === 'customer'){
                    navigate('/product');
                }
                else{
                    navigate('/managerproduct')
                }
            } catch (error) {
                console.error("Error during login: ", error);
                alert(`Error during login: ${error.message}`);
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
                onSubmit={e => { e.preventDefault(); handleLogin(); }}
            >
                <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: '#8B4513' }}>Log In to Your Account</h2>
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#6B4226' }}>Email:</p>
                    <input 
                        name='email' 
                        value={loginInput.email} 
                        style={{ width: '100%', height: '40px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #CCC', padding: '0 10px' }} 
                        onChange={handleLoginInputChange} 
                    />
                    <div style={{ color: 'red', marginBottom: '10px' }}>{loginInputErrors.email}</div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#6B4226' }}>Password:</p>
                    <input 
                        type='password' 
                        name='password' 
                        value={loginInput.password} 
                        style={{ width: '100%', height: '40px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #CCC', padding: '0 10px' }} 
                        onChange={handleLoginInputChange} 
                    />
                    <div style={{ color: 'red', marginBottom: '20px' }}>{loginInputErrors.password}</div>
                </motion.div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%', height: '40px', backgroundColor: '#8B4513', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom:'10px' }}
                    type="submit"
                >
                    Log In
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%', height: '40px', backgroundColor: '#6f4e37', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
                    onClick={() => navigate('/introduction')}
                >
                    Back to Home
                </motion.button>
                <div style={{ marginTop: '10px' }}>
                    <a href="#" style={{ color: '#8B4513' }} onClick={() => navigate('/change')}>Forgot Password?</a>
                </div>
            </motion.form>
        </div>
    );
};

export default Login;
