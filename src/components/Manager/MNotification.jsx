// ⁡⁣⁣⁢​‌‌‍𝗠𝗮𝗻𝗮𝗴𝗲𝗿 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻​⁡
import { getAuth, signOut } from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseconfig'

const MNotification = () => {
  const [renderEmployee, setRenderEmployee] = useState([])
  const [renderNotification, setRenderNotification] = useState([])
  const navigate = useNavigate()
  const currentDate = new Date()
  const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
  const isDateValid = (dateStr) => {
    return !isNaN(new Date(dateStr));
  }
  const [input, setInput] = useState({
    subject: '',
    content: ''
  })
  const [inputErrors, setInputErrors] = useState({
    subject: '',
    content: '',
  })
  const handleInputChange = (e) => {
    const newData = { ...input, [e.target.name]: e.target.value }
    setInput(newData)
  }
  useEffect(() => {
    const asycnFunction = async () => {
      const notificationCollection = collection(db, 'notificationsInfo')
      const userQuery = query(notificationCollection)
      const docs = await getDocs(userQuery)
      let notificationsList = docs.docs.map(doc => doc.data())
      setRenderNotification(notificationsList)
    }// Get the notification data in the Database
    asycnFunction()
  }, [])
  const handleSendNotification = (e) => {
    e.preventDefault()
    let flag = true // Check for input validation
    if (!input.subject) {
      setInputErrors(prev => ({ ...prev, subject: 'Please enter a subject for notification' }))
      flag = false
    }
    else {
      setInputErrors(prev => ({ ...prev, subject: '' }))
    }
    if (!input.content) {
      setInputErrors(prev => ({ ...prev, content: 'Please enter notification content' }))
      flag = false
    }
    else {
      setInputErrors(prev => ({ ...prev, content: '' }))
    }
    if (flag) {
      try {
        const docRef = addDoc(collection(db, "notificationsInfo"), {
          subject: input.subject,
          sendDate: formattedDate,
          content: input.content
        })
        setInput({
          ...input,
          subject: '',
          content: ''
        })
        alert('Sent')
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }//Add the new Notification to the Database
  }
  return (
    <div style={{ display: 'flex', backgroundColor: '#2569B3' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px' }}>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap',
        }} onClick={() => { navigate('/mtask') }}>Tasks Management</h1>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
        }} onClick={() => { navigate('/mstaff') }}>Staffs Management</h1>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
        }} >Notification</h1>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
        }} onClick={() => { navigate('/mlibrary') }}>Library</h1>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
        }} onClick={() => { navigate('/mchat') }}>Quick Chat</h1>
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
      <div style={{ width: '100%' }}>
        <form style={{ backgroundColor: 'grey', padding: '20px', borderRadius: '10px', width: '80%', marginLeft: '140px', marginTop: '60px' }}>
          <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>SEND NOTIFICATION (Everyone)</h2>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Subject:</p>
          <input name='subject' style={{ width: '100%', height: '40px' }} onChange={handleInputChange} value={input.subject} />
          <div style={{ color: 'red' }}>{inputErrors.subject ? inputErrors.subject : ''}</div>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Send Date:</p>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{formattedDate}</p>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Content:</p>
          <input name='content' style={{ width: '100%', height: '80px' }} onChange={handleInputChange} value={input.content} />
          <div style={{ color: 'red' }}>{inputErrors.content ? inputErrors.content : ''}</div>
          <button type="submit" className="btn btn-primary" style={{ fontWeight: 'bold', marginTop: '40px', width: '100%', height: '40px', backgroundColor: 'red' }} onClick={handleSendNotification}>SEND</button>
        </form>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#notiHistory" style={{ backgroundColor: 'red', marginLeft: '10px', marginTop: '10px' }}>
          NOTIFICATION HISTORY
        </button>
      </div>
      <div class="modal fade" id="notiHistory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Notification History</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul style={{ listStyle: 'none', marginRight: '45px' }}>
                {renderNotification.map(e => (
                  <li style={{ fontWeight: 'bold', fontSize: '20px', backgroundColor: 'gray', padding: '10px', borderRadius: '20px', marginBottom: '30px', textAlign: 'left' }}>
                    <p>Name: {e.subject}</p>
                    <p style={{ fontWeight: 'normal', fontSize: '15px' }}>Send Date: {e.sendDate}</p>
                    <p style={{ fontWeight: 'normal', fontSize: '15px' }}>content: {e.content}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MNotification