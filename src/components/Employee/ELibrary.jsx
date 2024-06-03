// ⁡⁣⁣⁢​‌‌‍𝗘𝗺𝗽𝗹𝗼𝘆𝗲𝗲 𝗟𝗶𝗯𝗿𝗮𝗿𝘆 𝗖𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁​⁡
import { getAuth, signOut } from 'firebase/auth'
import { collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseconfig'
const ELibrary = () => {
    const navigate = useNavigate()
    const [renderDocument, setRenderDocument] = useState([])
    useEffect(() => {
        const asycnFunction = async () => {
            const documentCollection = collection(db, 'libraryInfo')
            const userQuery = query(documentCollection)
            const docs = await getDocs(userQuery)
            let documentList = docs.docs.map(doc => doc.data())
            setRenderDocument(documentList)
        }
        asycnFunction()
    }, []) // Call the Documents array from the Database
    return (
        <div style={{ display: 'flex', backgroundColor: '#2569B3' }}>
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
            <div style={{ marginLeft: '220px', height: '695px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'linear-gradient(135deg, red 0%, #000000 100%)', padding: '20px', marginLeft: '450px', borderRadius: '20px' }}>
                    <h1 style={{ fontFamily: 'Arial', fontSize: '48px', color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold', background: 'linear-gradient(to right, #ff6347, #ff0000)', borderRadius: '10px', padding: '10px' }}>Documentary</h1>
                </div>
                <div style={{ marginTop: '200px', display: 'flex', flexWrap: 'wrap', marginLeft: '120px', maxWidth: '1500px' }}>
                    {renderDocument.map((e, index) => (
                        <div key={index} style={{ backgroundColor: 'none', marginRight: '50px' }}>
                            <div type="button" className="btn btn-primary" data-toggle="modal" data-target={`#openDoc${index}`} style={{ borderRadius: '20px', padding: '10px 20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor:'white' }}>
                                <h3 style={{ margin: '0', fontSize: '22px', color: '#333' }}>{e.title}</h3>
                                <h3 style={{ margin: '0', fontSize: '16px', color: '#666' }}>publish date: {e.publishDate}</h3>
                            </div>
                            <div className="modal fade" id={`openDoc${index}`} tabIndex="-1" role="dialog" aria-labelledby={`openDoc${index}Label`} aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id={`openDoc${index}Label`} style={{ color: 'black' }}>{e.title}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body" style={{ maxWidth: '100%', color: 'black', display: 'flex', flexWrap: 'wrap' }}>
                                            <p style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{e.content}</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default ELibrary