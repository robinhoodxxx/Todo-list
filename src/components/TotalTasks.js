import React from 'react'

const TotalTasks = ({pendingtasks}) => {
  return (
    
    <footer className='flex  items-center mx-2 capitalize font-bold '>
        <span className='text-gray-500 mr-3'>pending tasks :-</span>
        <span className='text-red-500'>{pendingtasks}</span>
    </footer>
  )

}

export default TotalTasks