import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({id, setValid }) => {
    const navigate = useNavigate()
    const [show, isShowed] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`https://65b5ea4dda3a3c16ab00077e.mockapi.io/users/${id}`)
            .then((response) => response.json())
            .then((json) => setData(json));
    }, [])
    let fullname = "";
    console.log(data)
    
    const handleButtonClick = () => {
        isShowed(prev => !prev)
    }
    const handleLogoutClick = () => {
        setValid(false)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button 
        style={{ 
            width: '100px', 
            height: '40px', 
            backgroundColor: '#4CAF50', 
            border: 'none',
            color: 'white',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '5px',
            margin: '10px',
            cursor: 'pointer'
        }} 
        onClick={handleButtonClick}
    >
        {fullname}
    </button>
    {show &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button 
                style={{ 
                    width: '150px', 
                    height: '40px', 
                    backgroundColor: '#008CBA', 
                    border: 'none',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    borderRadius: '5px',
                    margin: '5px',
                    cursor: 'pointer'
                }}
            >
                Profile
            </button>
            <button 
                style={{ 
                    width: '150px', 
                    height: '40px', 
                    backgroundColor: '#f44336',
                    border: 'none',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    borderRadius: '5px',
                    margin: '5px',
                    cursor: 'pointer'
                }}
            >
                Manage
            </button>
            <button onClick={handleLogoutClick}
                style={{ 
                    width: '150px', 
                    height: '40px', 
                    backgroundColor: '#555555', 
                    border: 'none',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    borderRadius: '5px',
                    margin: '5px',
                    cursor: 'pointer'
                }}
            >
                Log out
            </button>
        </div>
    }
</div>
    )
}

export default Header