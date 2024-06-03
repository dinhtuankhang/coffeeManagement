import React from 'react';
import DivingSupply from '../../images/DivingSupply.jpg';
import DivingTools from '../../images/DivingTools.jpg';
import RovAtom1 from '../../images/RovAtom1.jpg';
import RovPantherPlus932 from '../../images/RovPantherPlus932.jpg';
import { useNavigate } from 'react-router-dom';

const MachinesAndDevices = () => {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', backgroundColor:'#2569B3' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', padding: '10px', height: '695px', width: '200px', position: 'fixed' }}>
        <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/login')}}>Log in/Sign up</h1>
        <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/introduction')}}>Introduction</h1>
        <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/services')}}>Services Provided</h1>
        <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/staffs')}}>Staffs</h1>
        <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Machines/Devices</h1>
        <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/completedjobs')}}>Completed Jobs</h1>
      </div>
      <div style={{marginRight:'210px'}}>
        <div style={{display:'flex'}}>
        <img src={DivingSupply} alt="Diving Supply" />
        <h1 style={{marginTop:'190px', marginLeft:'15px', backgroundColor:'darkred', marginBottom:'225px', paddingTop:'15px', borderRadius:'20px', color:'white'}}>Diving Supply</h1>
        </div>
        <div style={{display:'flex'}}>
        <img src={DivingTools} alt="Diving Tools" />
        <h1 style={{marginTop:'190px', marginLeft:'15px', backgroundColor:'darkred', marginBottom:'225px', paddingTop:'15px', borderRadius:'20px', color:'white'}}>Diving Tools</h1>
        </div>
        <div style={{display:'flex'}}>
        <img src={RovAtom1} alt="ROV Atom 1" />
        <h1 style={{marginTop:'190px', marginLeft:'15px', backgroundColor:'darkred', marginBottom:'225px', paddingTop:'15px', borderRadius:'20px', color:'white'}}>ROV Atom 1</h1>
        </div>
        <div style={{display:'flex'}}>
        <img src={RovPantherPlus932} alt="ROV Panther Plus 932" />
        <h1 style={{marginTop:'190px', marginLeft:'15px', backgroundColor:'darkred', marginBottom:'225px', paddingTop:'15px', borderRadius:'20px', color:'white'}}>ROV Panther Plus 932</h1>
        </div>
      </div>
    </div>
  );
};

export default MachinesAndDevices;
