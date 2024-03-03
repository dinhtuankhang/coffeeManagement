import React, { useEffect, useRef } from 'react'

const AutoFocus = () => {
    const focusRef = useRef(null)
    useEffect(()=>{
        focusRef.current.focus()
    }, [])
  return (
    <input type='text' ref={focusRef}></input>
  )
}
export default AutoFocus