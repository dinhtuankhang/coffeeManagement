// ​‌‌‍⁡⁣⁣⁢𝗖𝗮𝗹𝗲𝗻𝗱𝗮𝗿 ​‌‌‍𝗖𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁​⁡​
import { getAuth, onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebaseconfig'
import { collection, getDocs, query, where } from 'firebase/firestore'

const ECalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [yearTasks, setYearTasks] = useState([])
    const [monthTasks, setMonthTasks] = useState([])
    const [dueDateWork, setDueDateWork] = useState({})
    const navigate = useNavigate()
    const [renderTask, setRenderTask] = useState([])
    const [taskDay, setTaskDay] = useState({})
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
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
                    const asycnFunction2 = async () => {
                        const taskCollection = collection(db, 'tasksInfo')
                        const userQuery = query(taskCollection, where("assignedEmployee", "==", currentUser.fullname))
                        const docs = await getDocs(userQuery)
                        let tasksList = docs.docs.map(doc => doc.data())
                        setRenderTask(tasksList)

                        let dueDateWorks = {}

                        tasksList.map((work) => {
                            const deadlineDay = work.dueDate.slice(8)
                            const deadlineYear = work.dueDate.slice(0, 4)
                            const deadlineMonth = work.dueDate.slice(6, 7)
                            if ((deadlineYear === year) && (deadlineMonth === month)) {
                                // if(+deadlineDay in dueDateWork)
                                    //nằm trong thành mảng, không nằn trong thành object
                                dueDateWorks[+deadlineDay] = {
                                    ...work
                                }
                            }
                        })


                        setDueDateWork(dueDateWorks)
                    }
                    asycnFunction2()
                    // Render the tasks in array from that are assigned to that employee based on their fullname.
                } else {
                    // User is signed out
                    // ...
                }
            });
        }
        asycnFunction()
    }, [])


    // useEffect(()=> {
    //     for (let i = 0; i < renderTask.length; i++) {
    //         if (renderTask[i].dueDate.slice(0, 4) === currentDate.getFullYear()) {
    //             yearTasks.push(renderTask[i])
    //         }
    //     }
    //     for (let i = 0; i < yearTasks.length; i++) {
    //         if (yearTasks[i].dueDate.slice(6, 7) === month[currentDate.getMonth()]) {
    //             monthTasks.push(renderTask[i])
    //         }
    //     }
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    


    // Create an array of days in the month
    const monthDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        monthDays.push('');
    }
    for (let i = 1; i <= daysInMonth; i++) {
        monthDays.push(i);
    }
    return (
        <div style={{ display: 'flex', backgroundColor: '#2569B3' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px' }}>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap',
                }} onClick={() => { navigate('/edashboard') }}>Dashboard</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/enotification') }}>Notification</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} >Calendar</h1>
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
            <div style={{ width: '87%' }}>
                <h1 style={{ marginLeft: '550px' }}>{month} {year}</h1>
                <table style={{ width: '100%', borderCollapse: 'collapse', height: '80%' }}>
                    <thead>
                        <tr>
                            {days.map((day, index) => (
                                <th key={index} style={{ padding: '8px', textAlign: 'center', border: '1px solid #ddd', fontSize: '20px' }}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array(Math.ceil(monthDays.length / 7)).fill().map((_, weekIndex) => (
                            <tr key={weekIndex}>
                                {Array(7).fill().map((_, dayIndex) => {
                                    const day = monthDays[weekIndex * 7 + dayIndex];
                                    const isCurrentDate = day === currentDate.getDate();
                                    return (
                                        <td key={dayIndex} style={{ padding: '8px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: isCurrentDate ? '#FFB09C' : 'transparent' }}>
                                            {dueDateWork[day] ?
                                                <span type="button" className="btn btn-primary" data-toggle="modal" data-target={`#openDay${dayIndex}`} style={{ fontWeight: 'bold', color: dueDateWork[day] ? 'red' : 'white' }} onClick={() => { setTaskDay(dueDateWork[day]); window.$('#openDay').modal('show') }}>{day !== undefined ? day : ''}</span> : <span style={{ fontWeight: 'bold', color: dueDateWork[day] ? 'red' : 'white' }} >{day !== undefined ? day : ''}</span>}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="modal fade" id={`openDay`} tabIndex="-1" role="dialog" aria-labelledby={`openDocLabel`} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`openDocLabel`} style={{ color: 'black' }}>Tasks:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ maxWidth: '100%', color: 'black', display: 'flex', flexWrap: 'wrap' }}>
                                {taskDay.taskName}

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ECalendar