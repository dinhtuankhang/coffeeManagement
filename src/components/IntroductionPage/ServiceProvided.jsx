import React from 'react';
import { useNavigate } from 'react-router-dom';
const ServiceProvided = () => {
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#2569B3' }}>
            <div style={{ backgroundImage: 'url("https://www.vietsov.com.vn/_catalogs/masterpage/vietsov/assets/images/hinhanhtulieu/15.jpg")', width: '50%', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', height: '80%' }}>
                <h2 style={{ textAlign: 'center', color: 'darkred' }}>DIVING SERVICES</h2>
                <ul style={{  listStyleType: 'none', padding: 5, backgroundColor:'lightgray', borderRadius:'5px' }}>
                    <li>Operating in depth up to 60m.</li>
                    <li>Inspection, Survey and Maintenance underwater structure/floating unit.</li>
                    <li>Assembling/Disassembling pipeline flange joints.</li>
                    <li>Seabed inspection, search and recover objects.</li>
                    <li>ACFM, MPI, CP, underwater welding and cutting, etc.</li>
                </ul>
            </div>
            <div style={{ backgroundImage: 'url("https://www.rovplanet.com/tportal_upload/md_weblap_tartalom/pic2_18.jpg")', width: '45%', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', height: '80%' }}>
                <h2 style={{ textAlign: 'center', color: 'darkred' }}>ROV SERVICES</h2>
                <ul style={{ listStyleType: 'none', padding: 5, backgroundColor:'lightgray', borderRadius:'5px' }}>
                    <li>Seabed Survey and Debris Removal before Rig approaching.</li>
                    <li>Survey and report anomalies of pipelines, riser and jacket.</li>
                    <li>CP, UT and Marine growth Measurement.</li>
                    <li>Support Drilling.</li>
                    <li>Free-span correction.</li>
                    <li>Support installation & disconnect valve, pipe, calm buoy and jacket/FSO.</li>
                    <li>Any SOW within the capabilities of ROVs.</li>
                </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px' }}>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap',
                }} onClick={()=>{navigate('/login')}}>Log in/Sign up</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={()=>{navigate('/introduction')}}>Introduction</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }}>Services Provided</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={()=>{navigate('/staffs')}}>Staffs</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={()=>{navigate('/machinesdevices')}}>Machines/Devices</h1>
                <h1 style={{
                    margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap'
                }} onClick={()=>{navigate('/completedjobs')}}>Completed Jobs</h1>
            </div>
        </div>
    );
};

export default ServiceProvided;