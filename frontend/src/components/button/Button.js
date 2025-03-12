import React from 'react'
import './button.css'

export const Button = ({type, children, className, icon:Icon}) => {
  return (
    <div className='button'>
        <button className={`${className} ? ${className}: 'propButton'`} type={type}>
            {children}
        </button>
    </div>
  )
}
  