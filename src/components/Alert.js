import React, { useEffect } from 'react'

const Alert = ({ alert, removealert, list }) => {

  const { msg, color } = alert

  useEffect(() => {
    const timeout = setTimeout(() => {
      removealert()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [list])

  return (
    <p className={color && `text-${color}-500 w-auto rounded-md capitalize text-center my-1 py-1 border-2 border-${color}-500`}>{msg}</p>
  )
}

export default Alert