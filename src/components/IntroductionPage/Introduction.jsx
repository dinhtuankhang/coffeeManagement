import React from 'react'
import { useNavigate } from 'react-router-dom'

const Introduction = () => {
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#2569B3', height: '695px' }}>
            <img
                src="https://www.vietsov.com.vn/_catalogs/masterpage/vietsov/assets/images/banner-img-3.jpg"
                alt=""
                style={{ width: '600px', height: '695px', objectFit: 'cover', marginRight: '20px' }}
            />
            <div>
                <h1 style={{ color: 'red', fontSize: '40px', marginBottom: '10px', marginLeft: '200px' }}>VIETSOPETRO</h1>
                <p style={{ color: 'white', fontSize: '20px', lineHeight: '1.6', marginRight: '20px' }}>
                    Established in 1981, Vietsovpetro is a joint venture between S.R. Vietnam and the Soviet Union, now the Russian Federation.
                    It specializes in petroleum exploration and production on Vietnam's Southern continental shelf. With over 7,000 international experts,
                    it operates in Vietnam and Southeast Asia, conducting seismic surveys, drilling wells, and discovering oil and gas fields.
                    Vietsovpetro has extracted over 228 million tons of crude oil and transported billions of cubic meters of gas, contributing significantly to Vietnam's economy.
                    Recognized for its efficiency, it has received prestigious awards from the Vietnamese Government.
                </p>
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div class="col-md-4 d-flex align-items-center">
                        <img style={{ width: '20px', marginRight: '5px' }} src='https://upload.wikimedia.org/wikipedia/en/a/ad/Logo_of_Vietsovpetro.png' alt='' />
                        <span style={{ color: 'white' }}>Vietsopertro Company</span>
                    </div>
                    <div class="col-md-4 d-flex align-items-center" style={{marginRight:'50px'}}>
                        <span style={{ color: 'white', marginRight: '10px' }}>Phone: +123456789</span>
                        <span style={{ color: 'white' }}>Email: info@vietsopertro.com</span>
                    </div>
                </footer>
            </div>
            <div style={{ 
                display: 'flex', flexDirection: 'column', justifyContent: 'space-around', 
                alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px' }}>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap',
                }} onClick={() => { navigate('/login') }}>Log in/Sign up</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }}>Introduction</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/services') }}>Services Provided</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/staffs') }}>Staffs</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/machinesdevices') }}>Machines/Devices</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={() => { navigate('/completedjobs') }}>Completed Jobs</h1>
            </div>
        </div>
        // The NavBar has the navigation function to navigate through tabs
    )
}

export default Introduction