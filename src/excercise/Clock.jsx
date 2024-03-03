import React, { useEffect, useRef, useState } from 'react'

const Clock = () => {
    let [time, setTime] = useState(60)
    let timeRef = useRef()
    useEffect(()=>{
        timeRef.current = setInterval(()=>{
            setTime((time => time-1))
        }, 1000)
        return()=>{
            clearInterval(timeRef.current)
        }
    }, [])
    useEffect(()=>{
       if(time == 0){
        clearInterval(timeRef.current)
       }
    }, [time])
    
  return (
    <div>{time}</div>
  )
}

export default Clock