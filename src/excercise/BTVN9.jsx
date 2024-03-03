import React, { useEffect, useState } from 'react'
import Clock from './Clock'

const BTVN9 = () => {
    let [count, setCount] = useState(0)
    let [isClick, setIsClick] = useState(false)
    useEffect(()=>{
        console.log("UseEffect khong co dependency")
    })
    useEffect(()=>{
        console.log("UseEffect co dependency la mot mang rong")
    },[])
    return (
        <>
            <div>Day la btvn buoi {count}</div>
            <button onClick={() => setCount((prev) => prev = prev + 1)}>Tang bien count</button>
            <button onClick={() => setIsClick(prev => !prev)}>Switch clicked state</button>
            {isClick && <Clock />}

           
        </>

    )
}

export default BTVN9