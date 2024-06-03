// ⁡⁣⁣⁢​‌‌‍𝗦𝗶𝗴𝗻𝘂𝗽 𝗮𝗻𝗱 𝗟𝗼𝗴𝗶𝗻 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻​⁡
import React, { useState } from 'react';
import { collection, addDoc, doc, query, getDocs, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext, useAuthContext } from '../../contexts/AuthProvider';
import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebaseconfig';
import { useQuery } from 'react-query';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';
const SignupLogin = () => {
    const [securityCode, setSecurityCode] = useState()
    const [login, setLogin] = useState(false)
    const [selectedUserRole, setSelectedUserRole] = useState('');
    const [signupInput, setSignupInput] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        userRole: ''
    })
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ''
    })
    const handleLoginInputChange = (e) => {
        const newData = { ...loginInput, [e.target.name]: e.target.value }
        setLoginInput(newData)
    }
    const handleSecurityCodeChange = (event) => {
        setSecurityCode(event.target.value)
    }
    const handleUserRoleChange = (event) => {
        setSelectedUserRole(event.target.value)
    }
    const navigate = useNavigate();
    const handleSignupInputChange = (e) => {
        const newData = { ...signupInput, [e.target.name]: e.target.value }
        setSignupInput(newData)
    }
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email)
    }; // Thiis is the function that can be used to check the validation of email
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return passwordRegex.test(password)
    } // Thiis is the function that can be used to check the validation of password
    const [inputErrors, setInputErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        userRole: selectedUserRole,
        securityCode: '',
    })
    const [loginInputErrors, setLoginInputErrors] = useState({
        email: '',
        password: ''
    })
    const handleSignup = (e) => {
        e.preventDefault()
        let flag = true
        if (!signupInput.username) {
            setInputErrors(prev => ({ ...prev, username: 'There must be a username' }))
            flag = false
        }
        else {
            setInputErrors(prev => ({ ...prev, username: '' }))
        } //⁡⁢⁣⁣Check if username input is empty or not⁡
        if (!validateEmail(signupInput.email)) {
            setInputErrors(prev => ({ ...prev, email: 'Invalid email' }))
            flag = false
        }
        else {
            setInputErrors(prev => ({ ...prev, email: '' }))
        } //⁡⁢⁣⁣Check if the email is validated⁡
        if (!validatePassword(signupInput.password)) {
            setInputErrors(prev => ({ ...prev, password: 'Password must contain at least 8 characters, one capital letter, one normal letter, numbers and special characters' }))
            flag = false
        }
        else {
            setInputErrors(prev => ({ ...prev, password: '' }))
        } //⁡⁢⁣⁣Check if the password is validated⁡
        if (!selectedUserRole) {
            setInputErrors(prev => ({ ...prev, userRole: 'Please choose a user role' }))
            flag = false
        }
        else {
            setInputErrors(prev => ({ ...prev, userRole: '' }))
        } //⁡⁢⁣⁣Check if the user role is selected⁡
        if (selectedUserRole === 'manager' && securityCode != 1111) {
            setInputErrors(prev => ({ ...prev, securityCode: 'Incorrect Code' }))
            flag = false
        }
        else {
            setInputErrors(prev => ({ ...prev, securityCode: '' }))
        }
        if (selectedUserRole === 'employee' && securityCode != 2222) {
            setInputErrors(prev => ({ ...prev, securityCode: 'Incorrect Code' }))
            flag = false
        }
        else {
            setInputErrors(prev => ({ ...prev, securityCode: '' }))
        }
        if (!(signupInput.confirmPassword === signupInput.password)) {
            setInputErrors(prev => ({ ...prev, confirmPassword: 'Passwords are not matched' }))
            flag = false
        }
        else {
            setInputErrors(prev => ({ ...prev, confirmPassword: '' }))
        } //⁡⁢⁣⁣Contrast the passwords are matched⁡
        if (flag) {
            createUserWithEmailAndPassword(auth, signupInput.email, signupInput.password)
                .then(async (userCredential) => {
                    // ⁡⁢⁣⁣Signed up ⁡
                    const user = userCredential.user;
                    try {
                        const docRef = await addDoc(collection(db, "employeesInfo"), {
                            username: signupInput.username,
                            email: signupInput.email,
                            userRole: selectedUserRole,
                            uid: user.uid,
                            fullname: '',
                            img: '',
                            taskNumber: 0
                        });
                        if (selectedUserRole === 'employee') {
                            navigate('/edashboard');
                        } else {
                            navigate('/mtask');
                        }
                    } catch (error) {
                        console.error("Error adding document or navigating: ", error);
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } //⁡⁣⁢⁡⁢⁣⁣If all the conditions are met, started to add data to the Database⁡
    }
    const handleLogin = () => {
        let flag = true
        if (!loginInput.email) {
            setLoginInputErrors(prev => ({ ...prev, email: 'Please Type Your Email' }))
            flag = false
        }
        else {
            setLoginInputErrors(prev => ({ ...prev, email: '' }))
        }
        if (!loginInput.password) {
            setLoginInputErrors(prev => ({ ...prev, password: 'Please Type Your Password' }))
            flag = false
        }
        else {
            setLoginInputErrors(prev => ({ ...prev, password: '' }))
        }
        if (flag) {
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    signInWithEmailAndPassword(auth, loginInput.email, loginInput.password)
                        .then(async (userCredential) => {
                            setLogin(true)
                            // ⁡⁢⁣⁣Signed in ⁡
                            const user = userCredential.user;
                            const userCollection = collection(db, 'employeesInfo')
                            getDocs(userCollection)
                            const userQuery = query(userCollection, where("uid", "==", user.uid))
                            const docs = await getDocs(userQuery)
                            let currentUser
                            docs.forEach((doc) => {
                                currentUser = doc.data()
                            });
                            if (currentUser.userRole === 'employee') {
                                navigate('/edashboard')
                            }
                            else {
                                navigate('/mtask')
                            }
                        })
                })
                .catch((error) => {
                    console.log(error)
                    const errorCode = error.code;
                    const errorMessage = error.message;

                });
        } // ⁡⁢⁣⁣‍Check with the Database, if matched, sign users in.⁡
    }
    return (
        <div style={{ display: 'flex', minHeight: '695px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2569B3', width: '50%' }}>
                <form style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '80%' }}>
                    <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>Sign up</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Username:</p>
                    <input name='username' value={signupInput.username} style={{ width: '100%', height: '40px' }} onChange={handleSignupInputChange} />
                    <div style={{ color: 'red' }}>{inputErrors.username ? inputErrors.username : ''}</div>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Password:</p>
                    <input type='password' name='password' value={signupInput.password} style={{ width: '100%', height: '40px' }} onChange={handleSignupInputChange} />
                    <div style={{ color: 'red' }}>{inputErrors.password ? inputErrors.password : ''}</div>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Confirm Password:</p>
                    <input type='password' name='confirmPassword' value={signupInput.confirmPassword} style={{ width: '100%', height: '40px' }} onChange={handleSignupInputChange} />
                    <div style={{ color: 'red' }}>{inputErrors.confirmPassword ? inputErrors.confirmPassword : ''}</div>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Email:</p>
                    <input name='email' value={signupInput.email} style={{ width: '100%', height: '40px' }} onChange={handleSignupInputChange} />
                    <div style={{ color: 'red' }}>{inputErrors.email ? inputErrors.email : ''}</div>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>User Role:</p>
                    <select id="userRole" style={{ width: '100%', height: '40px' }} onChange={handleUserRoleChange}>
                        <option value="" disabled selected>Select your option</option>
                        <option value={'employee'}>Employee</option>
                        <option value={'manager'}>Manager</option>
                    </select>
                    <div style={{ color: 'red' }}>{inputErrors.userRole ? inputErrors.userRole : ''}</div>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Security Code:</p>
                    <input name='email' style={{ width: '100%', height: '40px' }} onChange={handleSecurityCodeChange} />
                    <div style={{ color: 'red' }}>{inputErrors.securityCode ? inputErrors.securityCode : ''}</div>
                    <button type="submit" className="btn btn-primary" style={{ fontWeight: 'bold', marginTop: '40px', width: '100%', height: '40px', backgroundColor: '#FF0000' }} onClick={handleSignup}>Sign Up</button>
                </form>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2569B3', width: '50%' }}>
                <form style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '80%' }}>
                    <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>Log In</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Email:</p>
                    <input name='email' style={{ width: '100%', height: '40px' }} onChange={handleLoginInputChange} />
                    <div style={{ color: 'red' }}>{loginInputErrors.email ? loginInputErrors.email : ''}</div>
                    <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>Password:</p>
                    <input name='password' type='password' style={{ width: '100%', height: '40px' }} onChange={handleLoginInputChange} />
                    <div style={{ color: 'red' }}>{loginInputErrors.password ? loginInputErrors.password : ''}</div>
                    <div style={{ marginTop: '10px' }}>
                        <a href="#" style={{ color: 'blue' }} onClick={() => { navigate('/change') }}>Forgot Password?</a>
                    </div>
                    <button type="button" className="btn btn-primary" style={{ marginTop: '20px', width: '100%', height: '40px', backgroundColor: '#FF0000', fontWeight: 'bold' }} onClick={handleLogin}>Log in</button>
                </form>
                <button type='button' className="btn btn-primary" style={{ fontWeight: 'bold', marginLeft: '500px', marginTop: '190px', width: '200px', height: '40px', backgroundColor: '#FF0000', color: 'white', borderRadius: '10px' }} onClick={() => { navigate('/introduction') }}>Back To Home Page</button>
            </div>
        </div>
    );
};

export default SignupLogin;
