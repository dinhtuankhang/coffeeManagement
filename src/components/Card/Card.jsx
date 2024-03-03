import React from 'react'

export const Card = ({userName, phoneNumber}) => {
  return (
    <div>
        <span>{phoneNumber}</span>
        <span>{userName}</span>
    </div>
  )
}
