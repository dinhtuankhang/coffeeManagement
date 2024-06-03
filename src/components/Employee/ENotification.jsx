//⁡⁣⁣⁢​‌‌‍ 𝗘𝗺𝗽𝗹𝗼𝘆𝗲𝗲 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻​⁡
import { getAuth, signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseconfig'

const ENotification = () => {
    const navigate = useNavigate()
    const [renderNotification, setRenderNotification] = useState([])
    useEffect(() => {
        const asycnFunction = async () => {
            const notificationCollection = collection(db, 'notificationsInfo')
            const userQuery = query(notificationCollection)
            const docs = await getDocs(userQuery)
            let notificationsList = docs.docs.map(doc => doc.data())
            setRenderNotification(notificationsList)
        }
        asycnFunction()
    }, [])// Call the notification array
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ position: 'fixed', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px' }}>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap',
                }} onClick={() => { navigate('/edashboard') }}>Dashboard</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/enotification') }}>Notification</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/ecalendar') }}>Calendar</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/elibrary') }}>Library</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/echat') }}>Quick Chat</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => {
                    const auth = getAuth();
                    signOut(auth).then(() => {
                        // Sign-out successful.
                        navigate('/introduction')
                    }).catch((error) => {
                        // An error happened.
                    });
                }}>Log Out</h1>
            </div>
            <div style={{ marginLeft: '200px', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#2569B3', width: '87%', minHeight: '695px' }}>
                <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', padding: '20px', background: 'linear-gradient(to right, #ff6347, #ff0000)', borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '60%', margin: '0 auto', marginTop: '10px' }}>NOTIFICATION</h1>
                {renderNotification.map(e => (
                    <div style={{ backgroundColor: 'white', margin: '20px auto', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px gray' }}>
                        <div style={{ borderBottom: '1px solid gray', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#A9A9A9', fontSize: '20px', fontWeight: 'bold' }}>{e.subject}</span>
                            <span style={{ fontSize: '0.8em', color: '#777' }}>{e.sendDate}</span>
                        </div>
                        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid gray' }}>
                            <p>{e.content}</p>
                        </div>
                    </div>
                ))}
                {/* Render the Notifications */}
            </div>
        </div>
    )
}

export default ENotification