// ​‌‌‍⁡⁣⁣⁢𝗠𝗮𝗻𝗮𝗴𝗲𝗿 𝗦𝘁𝗮𝗳𝗳 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁⁡​
import { getAuth, signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import { event } from 'jquery'

const MStaffsManagement = () => {
  const [searchResult, setSearchResult] = useState([])
  const [clickedEmployee, setClickedEmployee] = useState({
    fullname: '',
    userRole: '',
    img: '',
    email: ''
  })
  const [searchInput, setSearchInput] = useState('')
  const [renderEmployee, setRenderEmployee] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const asycnFunction = async () => {
      const userCollection = collection(db, 'employeesInfo')
      const userQuery = query(userCollection, where("userRole", "==", "employee"))
      const docs = await getDocs(userQuery)
      let employeesList = docs.docs.map(doc => doc.data())
      setRenderEmployee(employeesList)
      setSearchResult(employeesList)
    }
    asycnFunction()
  }, []) // Take the employee array from the Database
  const handleSearch = (event) => {
    const input = event.target.value
    if (!input) {
      setSearchResult(renderEmployee)
    }
    else {

      setSearchInput(input);
      const results = renderEmployee.filter(item =>
        item.fullname.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResult(results);
    }
  }; //⁡⁢⁣⁣Take the array list of employees⁡

  return (
    <div style={{ position: 'fixed', display: 'flex', backgroundColor: '#2569B3' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px' }}>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap',
        }} onClick={() => { navigate('/mtask') }}>Tasks Management</h1>
        <h1 style={{
          margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
        }} >Staffs Management</h1>
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
      <div style={{ marginRight: '110px', marginLeft: '110px', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#2569B3', width: '70%' }}>
        <h1 style={{ color: 'darkred', fontSize: '30px', fontWeight: 'bold', marginBottom: '50px', borderRadius: '10px', backgroundColor: 'gray', padding: '10px', width: '500px', textAlign: 'center', marginLeft: '200px', marginBottom: '100px' }}>EMPLOYEES</h1>
        <div>
          <input type='text' placeholder='SearchBar' style={{ height: '35px', width: '50%', padding: '5px', marginBottom: '50px', borderRadius: '5px', border: '1px solid black' }} onChange={handleSearch} />
        </div>
        {searchResult.map((item, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', cursor: 'pointer' }} onClick={() => {
            const newData = { ...clickedEmployee, fullname: item.fullname, userRole: item.userRole, img: item.img, email: item.email }
            setClickedEmployee(newData)
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img src={item.img ? item.img : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'} alt='' style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
              <div>
                <h3 style={{ margin: 0 }}>{item.fullname}</h3>
                <p style={{ margin: 0, color: '#666' }}>{item.userRole}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: '100%', marginLeft: '1150px', position: 'fixed', backgroundColor: 'lightgray', width: '385px', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ marginLeft: '115px' }}>Profile</h1>
        <img src={clickedEmployee.img ? clickedEmployee.img : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1'} alt='' style={{ width: '240px', height: '240px', borderRadius: '50%', display: 'block', margin: '100px auto 20px' }} />
        <h2 style={{ textAlign: 'center', margin: '0', fontSize: '24px' }}>{clickedEmployee.fullname}</h2>
        <p style={{ textAlign: 'center', margin: '5px 0 5px', fontSize: '18px', color: '#666' }}>{clickedEmployee.userRole}</p>
        <p style={{ textAlign: 'center', margin: '5px 0 20px', fontSize: '18px', color: '#666' }}>{clickedEmployee.email}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        </div>
      </div>
    </div>
  )
}

export default MStaffsManagement