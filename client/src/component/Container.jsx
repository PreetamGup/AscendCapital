import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const Container = ({user}) => {
    const [List, setList]= useState([])
    const [listDetail, setListDetail] = useState()
    const [newTodo, setNewTodo] = useState("")
    const [listName, setListName] = useState("")
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState("")
    const dragItem = useRef(null)
    const dragOverItem = useRef(null);


    const addTodo =async()=>{
        try {
            const response = await axios.post('http://localhost:8080/todo/add',{list_id:listDetail.list_id, description:newTodo})
            if(response.data.success){
                setNewTodo("");
                setModal(false);
                fetchTodo();
            }
        } catch (error) {
            console.error(error.response.data.message)
        }
    }


    const createTodo =async()=>{
        try {
            const response = await axios.post('http://localhost:8080/todo/create',{user_id:user.user_id, list_name:listName, description:newTodo})
            if(response.data.success){
                setListName("");
                setNewTodo("")
                setModal(false);
                fetchTodo();
            }
        } catch (error) {
            console.error(error.response.data.message)
        }

    }

    const handleTodoComplete= async(todo_id)=>{
        try {
            const response = await axios.delete(`http://localhost:8080/todo/delete/${todo_id}`)
            if(response.data.success){
                fetchTodo();
            }
        } catch (error) {
            console.error(error.response.data.message)
        }

    }

    const changeTodoId=async(todo_id, list_id)=>{
        try {
            const response = await axios.put('http://localhost:8080/todo/update',{todo_id, list_id})
            if(response.data.success){
                fetchTodo()
            }
            
        } catch (error) {
            console.error(error.response.data.message)
        }
    }

    const fetchTodo =async()=>{
        try {
            const response = await axios.get(`http://localhost:8080/todo/get/${user.user_id}`);

            
            if(response.data.success){
                setList(response.data.todos)
            }

        } catch (error) {
            console.error(error.response.data.message)
        }
    }

    useEffect(()=>{

        fetchTodo()

    },[])

    const handleDragStart =(e, list, todo, postion)=>{
        const item= {
            list,
            todo,
            postion
        }

        dragItem.current= item
        // console.log("Dragged Item",dragItem.current)
    }

    const handleDragEnter =(e, list)=>{
        const item= {
            list,
        }

        dragOverItem.current= item
        // console.log("Drag Over",dragOverItem.current)
    }
    
    const drop =(e)=>{
        console.log("Dragged Item",dragItem.current)
        console.log("Drag Over",dragOverItem.current)

        changeTodoId(dragItem.current.todo.todo_id, dragOverItem.current.list.list_id)
        
        // if(dragItem.current.list.list_name !== dragOverItem.current.list.list_name) {
            

        //     let copyList = [...List];

        //     for(let list of copyList){
        //         if(list.list_name=== dragItem.current.list.list_name){
        //             list.todos.splice(dragItem.current.postion,1);
        //         }
        //     }

        //     for(let list of copyList){
        //         if(list.list_name=== dragOverItem.current.list.list_name){
        //             list.todos.push(dragItem.current.todo);
        //         }
        //     }
           

        //     setList([...copyList])


        // }
    }
    

  return (
    <div className="px-10 py-2 overflow-x-scroll flex gap-2 w-5/6 h-[60vh] relative">
      <div className=" w-48 text-center border h-fit sticky top-0 left-0">
        <h2 className=" bg-slate-300 text-center ">Create TodoList</h2>
        <button
          className=" text-7xl bg-slate-100 pb-2 w-48"
          onClick={() => {
            setModal(true);
            setModalType("createTodoList");
          }}
        >
          +
        </button>
      </div>

      {List?.map((item, idx) => (
        <div
          className=" w-48 border h-fit"
          onDragEnd={drop}
          onDragEnter={(e) => handleDragEnter(e, item)}
          key={idx}
        >
          <h2 className=" bg-slate-300 text-center w-48 ">{item.list_name}</h2>
          {item.todos.map((todo, idx) => (
            <div
              className="px-1 py-1 my-2 mx-1 bg-slate-100 cursor-grab focus:cursor-grabbing"
              key={idx}
              onDragStart={(e) => handleDragStart(e, item, todo, idx)}
              // onDragEnter={(e)=> handleDragEnter(e, item, todo, idx)}
              // onDragEnd={drop}
              draggable
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => handleTodoComplete(todo.todo_id)}
                  className=" w-4 h-4"
                />
                <span>{todo.description}</span>
              </div>
            </div>
          ))}

          <button
            className="bg-blue-200 px-3 m-1"
            onClick={() => {
              setModal(true);
              setModalType("addTodo");
              setListDetail(item)
            }}
          >
            Add More
          </button>
        </div>
      ))}

      {modal && (
        <div className=" absolute  bg-slate-500 bg-opacity-60 top-0 left-0 w-full h-full z-20 flex flex-row-reverse items-center justify-center">
          <div
            className="w-8 h-8 bg-red-200 flex justify-center items-center rounded-full"
            onClick={() => {
              setModal(false);
            }}
          >
            <button>X</button>
          </div>

          {modalType === "addTodo" ? (
            <div className="">
              <h2 className="my-2">Write Todo</h2>
              <input
                type="text"
                className="px-1 focus:outline-none py-1"
                onChange={(e)=> setNewTodo(e.target.value)}
                required
              />
              <button className="bg-blue-500 text-white px-2 py-1 mx-2" onClick={()=> addTodo()}>Add</button>
            </div>
          ) : (
            <div>
              <div className="">
                <h2 className="my-2">Create Todo List</h2>
                <input
                  type="text"
                  className="px-1 focus:outline-none py-1 mx-2"
                  onChange={(e)=> setListName(e.target.value)}
                  placeholder='List Name' 
                  required
                /> 

                <input
                  type="text"
                  className="px-1 focus:outline-none py-1"
                  onChange={(e)=> setNewTodo(e.target.value)}
                  placeholder='Add first Todo'
                  required
                />
                <button className="bg-blue-500 text-white px-2 py-1 mx-2" onClick={()=> createTodo()}>
                  Create
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Container