import React, { useState, useEffect} from 'react'
import Alert from './Alert';
import Todo from './Todo'
import TotalTasks from './TotalTasks';




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
    const [alert, setalert] = useState({ show: false, msg: null, color: null })
     const todoref= React.useRef()


    useEffect(()=>{
    
        const focus=()=>{
        todoref.current.focus()
    }
         focus()
    },[tasks,editmode])
    

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(tasks));
    }, [tasks]);


    const deleteTask = (id) => {

        const FilteredTasks = tasks.filter((item) => {
            return item.id !== id
        })

        settasks(FilteredTasks)
        setalert({ show: true, msg: 'Task Deleted', color: 'red' })

    }

    const editTask = (id) => {

        const editedtask = tasks.find((item) => {
            return item.id === id
        })

        seteditmode(true)
        settodo(editedtask.task)
        setEditId(id)

    }

    const clearallTasks=()=>{
        if(!tasks.length){
            setalert({ show: true, msg: 'No tasks available', color: 'red' })
            return
        }
            settasks([])
            
            setalert({ show: true, msg: 'All tasks deleted', color: 'red' })
            seteditmode(false)
            
        
    }


    const removealert = () => {
        setalert({ show: false, msg: '', color: '' })
    }

    



    const handleSumbit = (e) => {

        e.preventDefault()



        if (editmode) {

            const editedtasks = tasks.map((item) => {


                if (item.id === editId) {
                    return { ...item, task: todo }
                }
                return item

            })

            seteditmode(false)
            settasks(editedtasks)
            setalert({ show: true, msg: 'Editing completed ', color: 'green' })
            settodo('')

            return

        }
        settasks([...tasks, { id: Date.now().toString(), task: todo }])
        settodo('')
        setalert({ show: true, msg: 'Task added ', color: 'green' })

         

    }


    return (
        <main className='bg-sky-300 h-screen w-screen flex items-center justify-center '>
            <section className='bg-white flex  justify-center  rounded-lg flex-col  md:px-16 px-4   py-10 min-w-[280px] max-h-[90%]'>
                <header>
                    <h1 className='text-xl  capitalize font-medium text-center mb-5 text-blue-500'>todo list app</h1>
                </header>

                {alert.show && <Alert alert={alert} removealert={removealert} list={tasks} />}

                <form onSubmit={handleSumbit} className='my-5 flex' >

                    <input type="text" placeholder='Add Todo...'
                        test-id='todo'                    
                        value={todo} required
                        ref={todoref}
                        onChange={(e) => settodo(e.target.value)}
                        className='pl-5 py-1.5  border-2 rounded-md  outline-none focus:border-pink-500 flex-1'
                    />
                    <button className={`bg-pink-500 uppercase text-white rounded p-2 lg:mx-5 mx-2 shadow-lg hover:shadow-gray-400 ${editmode && 'bg-orange-500 '}`}
                        type='submit'>{editmode ? 'edit' : 'add'}
                    </button>
                </form>

                {

                    tasks.length > 0 && <h1 className='text-lg text-center text-red-600 capitalize font-medium my-2'>tasks</h1>
                }

                <ul className=' overflow-auto  my-2   scroll-smooth '>



                    {tasks.map((task, index) => {


                        return (



                            <Todo key={index} props={task} deleted={deleteTask} edit={editTask} />
                        )

                    })

                    }
                </ul>

                <footer className='flex justify-around'>

                    <TotalTasks pendingtasks={tasks.length} />
                    <button
                        className='text-white border-2 capitalize bg-pink-500 rounded-md px-2 py-1 hover:shadow-lg'
                        onClick={clearallTasks}>
                    clear all
                    </button>
                </footer>



            </section>


        </main>
    )
}

export default TodoList