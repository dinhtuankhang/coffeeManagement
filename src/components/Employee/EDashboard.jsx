// ⁡⁣⁣⁢​‌‌‍‍‍𝗘𝗺𝗽𝗹𝗼𝘆𝗲𝗲 𝗗𝗮𝘀𝗵𝗯𝗼𝗮𝗿𝗱 𝗖𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁​⁡
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebaseconfig'
const EDashboard = () => {
    const [name, setName] = useState(false)
    const [renderTask, setRenderTask] = useState([])
    const [currentUserProfile, setCurrentUserProfile] = useState({
        fullname: '',
        userRole: '',
        img: '',
        id: ''
    })
    const validateFullname = (fullname) => {
        const fullnameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        return fullnameRegex.test(fullname)
    };
    const navigate = useNavigate()
    const [infoInput, setInfoInput] = useState({
        fullname: '',
        img: ''
    })
    const [errrorInfoInput, setErrorInfoInput] = useState({
        fullname: '',
        img: ''
    })
    const handleInfoInputChange = (e) => {
        const newData = { ...infoInput, [e.target.name]: e.target.value }
        setInfoInput(newData)
    }


    useEffect(() => {
        const asycnFunction = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userCollection = collection(db, 'employeesInfo')
                    getDocs(userCollection)
                    const userQuery = query(userCollection, where("uid", "==", user.uid))
                    const docs = await getDocs(userQuery)
                    let currentUser = {}
                    docs.forEach((doc) => {
                        currentUser = doc.data()
                        currentUser.docId = doc.id
                    });
                    setCurrentUserProfile({
                        ...currentUserProfile,
                        fullname: currentUser.fullname,
                        img: currentUser.img,
                        userRole: currentUser.userRole,
                        id: currentUser.uid,
                        docId: currentUser.docId
                    });
                    if (!currentUser?.fullname) {
                        window.$('#editInfo').modal({
                            backdrop: 'static',
                            keyboard: true,
                            show: true
                        })
                    }// ⁡⁢⁣⁣Check if current user has fullname yet? If not, the modal will popup that require user to put their name in.⁡
                    else {
                        const asycnFunction2 = async () => {
                            const taskCollection = collection(db, 'tasksInfo')
                            const userQuery = query(taskCollection, where("assignedEmployee", "==", currentUser.fullname))
                            const docs = await getDocs(userQuery)
                            let tasksList = docs.docs.map(doc => doc.data())
                            setRenderTask(tasksList)
                        }
                        asycnFunction2()
                        setName(true)
                    }// ⁡⁢⁣⁣Render the tasks in array from that are assigned to that employee based on their fullname.⁡
                } else {
                    // ⁡⁢⁣⁣User is signed out⁡
                    // ...
                }
            });
        }
        asycnFunction()
    }, [])
    const handleSaveEdit = () => {

        let flag = true //⁡⁢⁣⁣Check for the input of the edit valid or not.⁡
        if (!validateFullname(infoInput.fullname)) {
            setErrorInfoInput(prev => ({ ...prev, fullname: 'Invalid Username' }))
            flag = false
        }
        else {
            setErrorInfoInput(prev => ({ ...prev, fullname: '' }))
        }
        if (flag) {
            setCurrentUserProfile({
                ...currentUserProfile,
                fullname: infoInput.fullname,
                img: infoInput.img
            }) //⁡⁢⁣⁣Update the current user data to the Database.⁡
            const asycnFunction = async () => {
                try {
                    const docRef = doc(db, 'employeesInfo', currentUserProfile.docId)
                    await setDoc(docRef, {
                        fullname: infoInput.fullname,
                        img: infoInput.img
                    }, { merge: true })
                } catch (e) {
                    console.error("Error setting document: ", e);
                }
            }
            asycnFunction()
            window.$('#editInfo').modal('hide')
        }
    }
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px', position: 'fixed' }}>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap',
                }} >Dashboard</h1>
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
            <div style={{ width: '950px', backgroundColor: '#2569B3', marginLeft: '200px', minHeight:'695px'}}>
                <h1 style={{ marginLeft: '350px', marginBottom: '100px', color: 'white' }}>DASHBOARD</h1>
                <ul style={{ padding: '0', margin:'10px'  }}>
                    {renderTask.map((e, index) => (
                          <div key={index} style={{ 
                            borderLeft: '4px solid #007bff', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '20px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                          <h2 style={{ marginTop: 0, marginBottom: '10px', color: '#333' }}>{e.taskName}</h2>
                          <p style={{ margin: '5px 0', color: '#666' }}><span style={{ fontWeight: 'bold', color: '#444' }}>{e.description}</span></p>
                          <p style={{ margin: '5px 0', color: '#666', fontStyle: 'italic' }}>Deadline: {e.dueDate}</p>
                        </div>
                    ))}
                </ul>
            </div>
            <div style={{ position: 'fixed', backgroundColor: 'lightgray', width: '385px', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginLeft: '1150px', height: '100%' }}>
                <h1 style={{ marginLeft: '115px' }}>Profile</h1>
                <img src={currentUserProfile.img? currentUserProfile.img : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'} alt='' style={{ width: '240px', height: '240px', borderRadius: '50%', display: 'block', margin: '100px auto 20px' }} />
                <h2 style={{ textAlign: 'center', margin: '0', fontSize: '24px' }}>{currentUserProfile.fullname}</h2>
                <p style={{ textAlign: 'center', margin: '5px 0 20px', fontSize: '18px', color: '#666' }}>{currentUserProfile.userRole}</p>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editInfo" 
                style={{ marginLeft: '120px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Edit Profile</button>
            </div>
            <div class="modal fade" id="editInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">{name ? 'Employee Information' : 'Please Enter Your Name'}</h5>
                            {name && <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>}
                        </div>
                        <div class="modal-body">
                            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Fullname:</p>
                            <input name='fullname' style={{ width: '100%', height: '40px' }} onChange={handleInfoInputChange} />
                            <div style={{ color: 'red' }}>{errrorInfoInput.fullname ? errrorInfoInput.fullname : ''}</div>
                            <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>Image URL:</p>
                            <input name='img' style={{ width: '100%', height: '40px' }} onChange={handleInfoInputChange} />
                            <div style={{ color: 'red' }}>{errrorInfoInput.img ? errrorInfoInput.img : ''}</div>
                        </div>
                        <div class="modal-footer">
                            {name && <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>}
                            <button type="button" class="btn btn-primary" onClick={handleSaveEdit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EDashboard