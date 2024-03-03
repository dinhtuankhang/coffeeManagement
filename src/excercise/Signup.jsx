import React, { useEffect, useRef, useState } from 'react'
import countryArray from '../constant/countries';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const focusRef = useRef(null)
  const [selectedCountry, setSelectedCountry] = useState('');
  useEffect(()=>{
    focusRef.current.focus()
  },[])
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    country: '',
  })
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    country: '',
  })
  const navigate = useNavigate()
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email)
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }
  const handleInputChange = (e) => {
    const newData = { ...input, [e.target.name]: e.target.value }
    setInput(newData)
  }
  const handleSignupSubmit = (e) => {
    e.preventDefault()
    let flag = true
    if (!input.fullName) {
      setErrors(prev => ({ ...prev, fullName: 'There must be a full name' }))
      flag = false
    }
    else {
      setErrors(prev => ({ ...prev, fullName: '' }))
    }
    if (!validateEmail(input.email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email' }))
      flag = false
    }
    else {
      setErrors(prev => ({ ...prev, email: '' }))
    }
    if (!validatePassword(input.password)) {
      setErrors(prev => ({ ...prev, password: 'Password must contain at least 8 characters, one capital letter, one normal letter, numbers and special characters' }))
      flag = false
    }
    else {
      setErrors(prev => ({ ...prev, password: '' }))
    }
    if (!input.username) {
      input.username = input.email
    }
    if (flag) {
      fetch('https://65b5ea4dda3a3c16ab00077e.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: input.fullName,
          email: input.email,
          username: input.username,
          password: input.password,
          country: selectedCountry,
        })
      })
      .then(res=>{
        if(res.ok){
          navigate('/Login')
        }
      })
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'lightgreen' }}>
      <form style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }} onSubmit={handleSignupSubmit}>
        <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: 'blue', marginLeft: '100px' }}>Create New Account</h2>
        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Full Name:</p>
        <input name='fullName' style={{ width: '500px', height: '40px' }} ref={focusRef} onChange={handleInputChange} />
        <div style={{ color: 'red' }}>{errors.fullName ? errors.fullName : ''}</div>
        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Email:</p>
        <input name='email' style={{ width: '500px', height: '40px' }} onChange={handleInputChange} />
        <div style={{ color: 'red' }}>{errors.email ? errors.email : ''}</div>
        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Country:</p>
        <select id="country" style={{ width: '500px', height: '40px' }} onChange={handleCountryChange}>
          <option value="" disabled selected>Select your option</option>
          {countryArray.map(e => (
            <option key={e.index} value={e.value}>{e.value}</option>
          ))}
        </select>
        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Username:</p>
        <input name='username' style={{ width: '500px', height: '40px' }} onChange={handleInputChange} />
        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Password:</p>
        <input name='password' type='password' style={{ width: '100%', height: '40px' }} onChange={handleInputChange} />
        <div style={{ color: 'red', width: '500px' }}>{errors.password ? errors.password : ''}</div>
        <button type="submit" class="btn btn-primary" style={{ marginTop: '40px', width: '100%', height: '40px' }}>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup