// ​‌‌‍⁡⁣⁣⁢𝗖𝗵𝗮𝗻𝗴𝗲 𝗣𝗮𝘀𝘀𝘄𝗼𝗿𝗱⁡​
import { sendPasswordResetEmail } from 'firebase/auth'
import { error } from 'jquery'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseconfig'

const ChangePassword = () => {
    const [input, setInput] = useState('')
    const handleChangePassword = async() =>{
        await sendPasswordResetEmail(auth, input)
        .then(()=>alert('Password Reset Email Sent'))
        .catch((error)=>console.log(error.message))
    }// Change Password Through Email
    const navigate = useNavigate()
    return (
        <div style={{backgroundColor:'#2569B3', height:'695px'}}>
            <button style={{color:'white', backgroundColor:'red', borderRadius:'20px', width:'300px', height:'50px', border:'none', cursor:'pointer'}} onClick={()=>{navigate('/login')}}>BACK TO LOGIN PAGE</button>
            <div style={{maxWidth: '400px',margin: '100px auto',padding: '20px',border: '1px solid #ccc',borderRadius: '5px',backgroundColor: 'lightgray',}}>
                <h2 style={{ marginTop: '0', }}>Change Password</h2>
                <form>
                    <div style={{ marginBottom: '15px', }}>
                        <label style={{display: 'block',  marginBottom: '5px'}}>Email:</label>
                        <input style={{width: '100%',padding: '10px',border: '1px solid #ccc',borderRadius: '5px',}} onChange={(e)=>{setInput(e.target.value)}}/>
                    </div>
                    <button type="submit" style={{width: '100%',padding: '10px',border: 'none',borderRadius: '5px',backgroundColor: '#2569B3',color: 'white',cursor: 'pointer',
                    }} onClick={handleChangePassword}>Send Change Password Email</button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword