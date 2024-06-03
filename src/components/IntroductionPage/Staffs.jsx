import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Staff() {
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex', height: '677px' }}>
            <div style={{ flex: 1, padding: '0px', backgroundColor: 'gray', height:'695px' }}>
                <h1 style={{ backgroundColor: '#EA0000', color: 'white', borderRadius: '10px', textAlign: 'center', margin: '0', width:'80%', marginLeft:'140px' }}>PERSONNEL</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', height: '600px' }}>
                    <div style={{ width: '48%', backgroundColor: '#2569B3', borderRadius: '10px', padding: '20px', color: 'white' }}>
                        <h2 style={{ marginBottom: '10px' }}>Diving Team</h2>
                        <ul style={{ paddingInlineStart: '20px', fontSize:'30px' }}>
                            <li>Diving Supervisors: 08</li>
                            <li>3.4 CSWIP: 01</li>
                            <li>Divers (level 1-3): 50</li>
                            <li>Doctor and Technicians</li>
                        </ul>
                        <p style={{ marginTop: '10px', fontSize: '20px' }}>(All the personnel are qualified by Lloyd’s Register)</p>
                    </div>
                    <div style={{ width: '48%', backgroundColor: '#2569B3', borderRadius: '10px', padding: '20px', color: 'white' }}>
                        <h2 style={{ marginBottom: '10px' }}>ROV Team</h2>
                        <p style={{ marginBottom: '10px', fontSize:'20px' }}>ROVs are operated and maintained by a well-trained ROV team in accordance with IMCA Guidelines, including:</p>
                        <ul style={{ paddingInlineStart: '20px', fontSize:'30px' }}>
                            <li>Supervisor: 05</li>
                            <li>Senior Pilot: 10</li>
                            <li>Pilot Grade I: 02</li>
                            <li>3.4 CSWIP: 01</li>
                        </ul>
                        <p style={{ marginTop: '10px', fontSize: '20px' }}>(Currently, we are training to upgrade some Pilots to Supervisors, and also training 3.4 CSWIP Inspectors.)</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', width: '200px', height:'695px' }}>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/login')}}>Log in/Sign up</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/introduction')}}>Introduction</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/services')}}>Services Provided</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Staffs</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/machinesdevices')}}>Machines/Devices</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/completedjobs')}}>Completed Jobs</h1>
            </div>
        </div>
    );
}

export default Staff;