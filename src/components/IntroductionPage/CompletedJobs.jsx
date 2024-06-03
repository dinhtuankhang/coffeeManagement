import React from 'react'
import { useNavigate } from 'react-router-dom'

const CompletedJobs = () => {
    const navigate = useNavigate()
    return (
        <div style={{display:'flex', backgroundColor:'#2569B3'}}>
            <div style={{   fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333', textAlign: 'center', }}>COMPLETED JOBS</h1>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>&#10003; Under Water Inspection on support of operation in Blocks 05-2 and 05-3 offshore Vietnam (BD-OPS-2016-033), BD POC. Total value: 530.348 USD</li>
                    <li>&#10003; ROV Service Year 2016 at Block 01 & 02 (RO 3620270612_PCV-DRLG2011-079), PCVL. Total value: 455.116 USD</li>
                    <li>&#10003; Provision of Under Water Survey Services of Dai Hung Field, Block 05-1a (PVEP POC-16-10022), PVEP POC. Total value: 531.444 USD</li>
                    <li>&#10003; Provision of Pre-Construction of Survey for Su Tu Trang Field (SO_28-0616-V-2), ROSEMARY. Total value: 33.000 USD</li>
                    <li>&#10003; Under Water Inspection for H5-WHP in Te Giac Trang Field, offshore Vietnam, Hoang Long JOC. Total value: 342.000 USD</li>
                    <li>&#10003; Under Water Inspection for Nam Con Son 2 Pipelines, connecting to Thien Ưng Platform, Offshore Vietnam, PV GAS. Total value: 1.244.000 USD</li>
                    <li>&#10003; Provision of pipeline inspection 10” for Diamond rig – Ruby (PVEP/2018/006(A)), PVEP block 01& 02. Total value: 276.094 USD</li>
                    <li>&#10003; In-water survey of Dragon rig, 10” pipeline section gas riser RC1 rig and 10” pipeline section gas riser for RP3 rig in 2018 (60/2018/KĐN-PVMTC-VSP/TM), PV GAS SE. Total value: 276.347 USD</li>
                    <li>&#10003; Provision of trenching and backfill for subsea pipelines in 2018 (BD-OPS2018-047), BD POC. Total value: 960.279 USD</li>
                    <li>&#10003; Under Water Inspection and free span correction for pipeline STV-RĐ- BHLH, TGT-BH, RP3-RC1 and 18" pipe line PM3-CÀ MAU, year 2018 (162/2018/DVK/TMHĐ-PTSC GS&VSP), PV GAS SERVICE. Total value: 2.529.054 USD</li>
                    <li>&#10003; Provision of UWILD FPSO MV19 (057/HD2018/PVTOFS-TCO), TCO. Total value: 90.433 USD</li>
                    <li>&#10003; Provision of DP2 vessel and navigation positioning services in block 15-1 year 2018 (041A-2013/PTSC-GS/ROV/MDV), PTSC G&S. Total value: 782.297 USD</li>
                    <li>&#10003; Provision of pipe line inspection of TGT H1&H4 year 2018 (HL-PRD-18-057), Hoang Long JOC. Total value: 390.106 USD</li>
                    <li>&#10003; Provision of CNV pipeline free span correction & WHP Jacket Survey (HVPRD-18-050), Hoan Vu JOC. Total value: 215.633 USD</li>
                </ul>
            </div>
            <div style={{  display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', background: 'red', color: '#fff', height: '695px', width: '200px', position: 'fixed', right: '0', }}>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/login')}}>Log in/Sign up</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/introduction')}}>Introduction</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/services')}}>Services Provided</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/staffs')}}>Staffs</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={()=>{navigate('/machinesdevices')}}>Machines/Devices</h1>
                <h1 style={{ margin: 0, padding: '10px 0', fontSize: '22px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Completed Jobs</h1>
            </div>
        </div>
    )
}

export default CompletedJobs