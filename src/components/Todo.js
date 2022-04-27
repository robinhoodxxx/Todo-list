import React from 'react'
import { RiDeleteBinLine, RiEditBoxLine } from 'react-icons/ri'

const Todo = ({ props, deleted, edit }) => {




    return (
        <li className='flex justify-between mb-5 mr-3  border-2  hover:border-sky-500 px-5 py-2 rounded-md hover:shadow-lg scroll-ml-10 '>

            <h1 className='text-blue-600 flex flex-col text-center overflow-auto font-medium mr-2'>{props.task}</h1>

            <div className='flex justify-center items-center'>

                <span
                    className='cursor-pointer   hover:text-orange-500  capitalize'
                    onClick={() => edit(props.id)}
                    title='edit'
                >
                    < RiEditBoxLine />
                </span>
                <span
                    className='cursor-pointer ml-5  hover:text-red-600'
                    onClick={() => deleted(props.id)}
                    title='delete'
                >
                    <RiDeleteBinLine />

                </span>
            </div>

        </li>
    )
}

export default Todo