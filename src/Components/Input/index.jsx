import React from 'react'
import './style.css'

const InputComponent = ({type,placeholder,value,setValue}) => {

  function handleChange(e){
    setValue(e.target.value);
  }

  return (
    <input
     className='custom-input'
       type={type}
       placeholder={placeholder}
       value={value}
        onChange={handleChange}
    />
      
  )
}

export default InputComponent
