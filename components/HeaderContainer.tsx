import React from 'react'

const HeaderContainer = ({type = 'title', title,user,subtext}:HeaderBoxProps) => {
  return (
    <div className='header-box'>
       <h1 className='font-extrabold text-2xl'>{title}
         {type === 'greeting' && <span className='text-sky-500'>&nbsp;{user}</span>}
       </h1>
         <p className='text-gray-500'>{subtext}</p>

    </div>
  )
}

export default HeaderContainer