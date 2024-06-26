import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseconfig';
import { motion } from 'framer-motion';

const ChangePassword = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            await sendPasswordResetEmail(auth, input);
            alert('Password Reset Email Sent');
        } catch (error) {
            console.error('Error sending password reset email:', error.message);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div style={{ backgroundColor: '#F3E5AB', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: '400px', margin: '50px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#FFFFFF', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <h2 style={{ marginTop: '0', marginBottom: '20px', fontWeight: 'bold', color: '#8B4513' }}>Change Password</h2>
                <form>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#6B4226' }}>Email:</label>
                        <input
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#8B4513',
                            color: '#FFF',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                        type="button"
                        onClick={handleChangePassword}
                    >
                        Send Change Password Email
                    </motion.button>
                </form>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        marginTop: '20px',
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#6f4e37',
                        color: '#FFF',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                    onClick={() => navigate('/login')}
                >
                    Back to Login Page
                </motion.button>
            </motion.div>
        </div>
    );
};

export default ChangePassword;
