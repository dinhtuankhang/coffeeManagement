// ⁡⁣⁣⁢​‌‌‍𝗠𝗮𝗻𝗮𝗴𝗲𝗿 𝗧𝗮𝘀𝗸 𝗠𝗮𝗻𝗮𝗴𝗲𝗻𝘁​⁡
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set } from "firebase/database";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';
const MTasksManagement = () => {
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
          }
          else {
            setName(true)
          }
        } else {
          // User is signed out
          // ...
        }
      }); // Check whether if current user has fullname or not. If not, require them to update it.
    }
    asycnFunction()
  }, [])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [renderEmployee, setRenderEmployee] = useState([])
  const currentDate = new Date()
  const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
  const navigate = useNavigate()
  const isDateValid = (dateStr) => {
    return !isNaN(new Date(dateStr));
  }
  const [input, setInput] = useState({
    taskName: '',
    dueDate: '',
    description: ''
  })
  const handleInputChange = (e) => {
    const newData = { ...input, [e.target.name]: e.target.value }
    setInput(newData)
  }
  const [inputErrors, setInputErrors] = useState({
    taskName: '',
    dueDate: '',
    description: '',
    assignedEmployee: ''
  })
  console.log(selectedEmployee)
  const handleAddTask = (e) => {
    e.preventDefault()
    let flag = true // ⁡⁢⁣⁣Check for input validation⁡
    if (!input.taskName) {
      setInputErrors(prev => ({ ...prev, taskName: 'There must be a name for new task' }))
      flag = false
    }
    else {
      setInputErrors(prev => ({ ...prev, taskName: '' }))
    }
    if (!input.description) {
      setInputErrors(prev => ({ ...prev, description: 'Please write description for the task' }))
      flag = false
    }
    else {
      setInputErrors(prev => ({ ...prev, description: '' }))
    }
    if (!isDateValid(input.dueDate)) {
      setInputErrors(prev => ({ ...prev, dueDate: 'Please write a valid day' }))
      flag = false
    }
    else {
      setInputErrors(prev => ({ ...prev, dueDate: '' }))
    }
    if (!selectedEmployee) {
      setInputErrors(prev => ({ ...prev, assignedEmployee: 'Please choose an employee' }))
      flag = false
    }
    else {
      setInputErrors(prev => ({ ...prev, assignedEmployee: '' }))
    }
    if (flag) {
      try {
        const docRef = addDoc(collection(db, "tasksInfo"), {
          taskName: input.taskName,
          assignedEmployee: selectedEmployee,
          dueDate: input.dueDate,
          description: input.description,
          postDate: formattedDate,
          isCompleted: false
        });
        setInput({
          ...input,
          taskName: '',
          dueDate: '',
          description: ''
        })
        setSelectedEmployee('')
        alert('Task add successfully')
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }// ⁡⁢⁣⁣Add Task to Database⁡
  }
  useEffect(() => {
    const asycnFunction = async () => {
      const userCollection = collection(db, 'employeesInfo')
      const userQuery = query(userCollection, where("userRole", "==", "employee"))
      const docs = await getDocs(userQuery)
      let employeesList = docs.docs.map(doc => doc.data())
      setRenderEmployee(employeesList)
      const taskCollection = collection(db, 'tasksInfo')
      const taskQuery = query(taskCollection)
      const taskDocs = await getDocs(taskQuery)
      let tasksList = taskDocs.docs.map(doc => doc.data())
      setRenderTask(tasksList)//Call the employee array from the 
    }
    asycnFunction()
  }, [])
  const handleSaveEdit = () => {

    let flag = true
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
      })
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
  }// Update the input to the Database

  return (
    <div style={{ display: 'flex', backgroundColor: '#2569B3' }}>
      <div style={{position:'fixed', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: 'white', padding: '10px', height: '695px', width: '200px' }}>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap',
        }} >Tasks Management</h1>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
        }} onClick={() => { navigate('/mstaff') }}>Staffs Management</h1>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
        }} onClick={() => { navigate('/mnotification') }}>Notification</h1>
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
      <div style={{ width: '950px', marginLeft:'220px', height:'770px' }}>
        <form style={{ backgroundColor: 'grey', padding: '20px', borderRadius: '10px', width: '80%', marginLeft: '100px', marginTop: '40px' }}>
          <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>ADD TASK</h2>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>TASK NAME:</p>
          <input name='taskName' style={{ width: '100%', height: '40px' }} onChange={handleInputChange} value={input.taskName} />
          <div style={{ color: 'red' }}>{inputErrors.taskName ? inputErrors.taskName : ''}</div>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>ASSIGNED EMPLOYEE:</p>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{selectedEmployee ? selectedEmployee : '(Click the names on the right to choose employee)'}</p>
          <div style={{ color: 'red' }}>{inputErrors.assignedEmployee ? inputErrors.assignedEmployee : ''}</div>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>DUE DATE:</p>
          <input name='dueDate' style={{ width: '100%', height: '40px' }} placeholder='YYYY/MM/DD' onChange={handleInputChange} value={input.dueDate} />
          <div style={{ color: 'red' }}>{inputErrors.dueDate ? inputErrors.dueDate : ''}</div>
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>TASK DESCRIPTION:</p>
          <input name='description' style={{ width: '100%', height: '80px' }} onChange={handleInputChange} value={input.description} />
          <div style={{ color: 'red' }}>{inputErrors.description ? inputErrors.description : ''}</div>
          <button type="submit" className="btn btn-primary" style={{ fontWeight: 'bold', marginTop: '40px', width: '100%', height: '40px', backgroundColor: 'red' }} onClick={handleAddTask}>ADD</button>
        </form>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#taskHistory" style={{ backgroundColor: 'red', marginLeft: '10px', marginTop: '10px' }}>
          TASK HISTORY
        </button>
      </div>
      <div style={{position:'fixed', backgroundColor: 'lightgray', width: '385px', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height:'100%', marginLeft:'78%' }}>
        <h1 style={{ marginLeft: '80px', marginBottom: '100px' }}>Employees</h1>
        <ul style={{ listStyle: 'none' }}>
          {renderEmployee.map(e => (
            <li style={{ fontWeight: 'bold', fontSize: '20px', backgroundColor: 'gray', padding: '10px', marginLeft: '55px', width: '175px', borderRadius: '20px', marginBottom: '30px', cursor: 'pointer', textAlign: 'center' }} onClick={() => { setSelectedEmployee(e.fullname) }}>{e.fullname}</li>
          ))}
        </ul>
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
      <div class="modal fade" id="taskHistory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Task History</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul style={{ listStyle: 'none', marginRight:'45px' }}>
                {renderTask.map(e => (
                  <li style={{ fontWeight: 'bold', fontSize: '20px', backgroundColor: 'gray', padding: '10px', borderRadius: '20px', marginBottom: '30px', textAlign:'left' }}>
                    <p>Name: {e.taskName}</p>
                    <p style={{fontWeight:'normal', fontSize:'15px'}}>Due: {e.dueDate}</p>
                    <p style={{fontWeight:'normal', fontSize:'15px'}}>Post: {e.postDate}</p>
                    <p style={{fontWeight:'normal', fontSize:'15px'}}>Employee: {e.assignedEmployee}</p>
                    <p style={{fontWeight:'normal', fontSize:'15px'}}>Description: {e.description}</p>
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

export default MTasksManagement