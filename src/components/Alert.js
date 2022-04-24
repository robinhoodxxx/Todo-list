import React, { useEffect } from 'react'

const Alert = ({ alert, removealert, list }) => {

  const { msg, color } = alert

  useEffect(() => {
    const timeout = setTimeout(() => {
      removealert()
    }, 800)

    return () => clearTimeout(timeout)
  }, [list])

  return (

    <div className='flex justify-center'>

      <p className={color&& `w-full max-w-[60%]  rounded-md capitalize text-center my-1 py-1 border-2 ${color==='red'? 'text-red-500 border-red-500':'text-green-500 border-green-500'}`}>{msg}</p>
    </div>
  )
}

export default Alert

