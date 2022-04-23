import React, { useState, useEffect } from 'react'
import Alert from './Alert';
import Todo from './Todo'




const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return (list = JSON.parse(localStorage.getItem('list')));
    } else {
        return [];
    }
};

const TodoList = () => {

    const [todo, settodo] = useState('')
    const [tasks, settasks] = useState(getLocalStorage())
    const [editmode, seteditmode] = useState(false)
    const [editId, setEditId] = useState(null)


    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(tasks));
    }, [tasks]);


    const deleteTask = (id) => {

        const FilteredTasks = tasks.filter((item) => {
            return item.id !== id
        })

        settasks(FilteredTasks)

    }

    const editTask = (id) => {

        const editedtask = tasks.find((item) => {
            return item.id === id
        })

        seteditmode(true)
        settodo(editedtask.task)
        setEditId(id)

    }


    const handleSumbit = (e) => {

        e.preventDefault()

        if (!todo) return

        if (editmode) {

            const editedtasks = tasks.map((item) => {


                if (item.id === editId) {
                    return { ...item, task: todo }
                }
                return item

            })

            settasks(editedtasks)

            settodo('')
            seteditmode(false)

            return

        }
        settasks([...tasks, { id: Date.now().toString(), task: todo }])
        settodo('')



    }


    return (
        <main className='bg-gray-400 h-screen w-screen flex items-center justify-center '>
            <section className='bg-white flex  justify-center max-w-max rounded-lg flex-col px-20 py-10 lg:min-w-[35%] max-h-[90%]'>
                <header>
                    <h1 className='text-xl  capitalize font-medium text-center mb-5 text-green-500'>todo list app</h1>
                </header>

                <form onSubmit={handleSumbit}   className='my-5 flex' >
                
                    <input type="text" placeholder=' Todo...'
                        value={todo}
                        onChange={(e) => settodo(e.target.value)}
                        className='pl-5 py-1.5  border-2 rounded-md  outline-none focus:border-pink-500 flex-1'
                    />
                    <button className={`bg-pink-500 uppercase text-white rounded p-2 ml-5 shadow-lg hover:shadow-gray-400 ${editmode && 'bg-orange-500 '}`}
                        type='submit'>{editmode ? 'edit' : 'go'}
                    </button>
                </form>

                <ul className=' overflow-y-auto  my-5  scroll-smooth'>

                    {tasks.map((task, index) => {


                        return (



                            <Todo key={index} props={task} deleted={deleteTask} edit={editTask} />
                        )

                    })

                    }
                </ul>


            </section>


        </main>
    )
}

export default TodoList