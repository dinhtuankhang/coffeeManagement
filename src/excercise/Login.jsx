import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState[{}]
    const [input, setInput] = useState({
        username: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        login: '',
    })
    const [valid, setValid] = useState(false)
    const [id, setId] = useState(null)
    const handleInputChange = (e) => {
        const newData = { ...input, [e.target.name]: e.target.value }
        setInput(newData)
    }
    const handleSubmitLogin = () => {
        let flag = true;
        if (input.username === "") {
            setErrors(prev => ({ ...prev, username: 'Please enter username' }))
            flag = false
        }
        else {
            setErrors(prev => ({ ...prev, username: '' }))
        }
        if (input.password === "") {
            setErrors(prev => ({ ...prev, password: 'Please enter password' }))
            flag = false
        }
        else {
            setErrors(prev => ({ ...prev, password: '' }))
        }
        if (flag) {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                if ((input.username === data[i].username) && (input.password === data[i].password)) {
                    setValid(true)
                    setId(data[i].id);
                    navigate('/')
                }
            }
            setErrors(prev => ({ ...prev, password: 'Incorrect username or password' }))
        }
    };
    useEffect(() => {
        fetch('https://65b5ea4dda3a3c16ab00077e.mockapi.io/users')
            .then((response) => response.json())
            .then((json) => setData(json))
    }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'lightgreen' }}>
            <form style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: 'blue', marginLeft: '150px' }}>Log In Center</h2>
                <div style={{ color: 'red' }}>{errors.login ? errors.login : ''}</div>
                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Username:</p>
                <input name='username' style={{ width: '500px', height: '40px' }} onChange={handleInputChange} />
                <div style={{ color: 'red' }}>{errors.username ? errors.username : ''}</div>
                <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>Password:</p>
                <input name='password' type='password' style={{ width: '100%', height: '40px' }} onChange={handleInputChange} />
                <div style={{ color: 'red' }}>{errors.password ? errors.password : ''}</div>
                <button type="button" class="btn btn-primary" style={{ marginTop: '40px', width: '100%', height: '40px' }} onClick={handleSubmitLogin}>Log in</button>
            </form>
        </div>
    )
}
export default Login