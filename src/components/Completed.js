import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';

const Completed = () => {
    const data = useSelector((store) => (store?.tasks?.task));
    const tasks=data.tasks
    const [filter,setFilter]=useState();

    async function handleDelete(id){
    console.log(id);
    try {
      const response=await axios.delete(BASE_URL,{
        id
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


    function formatDate(dateString){
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


    function completedTasks(){
      let filteredList=tasks.filter(
        (task)=>{
          return task.complete===true;
        }
      )
      setFilter(filteredList);
    }
    
    useEffect(()=>{
      completedTasks();
    },[]);

    if(!filter || filter.length===0){
      return (
        <div className='text-6xl text-center '>
          No Completed Tasks
        </div>
      );
    }
  return (
          filter.map((task) => (
            <div key={task._id} className="m-4 p-4 max-w-xs container border-2 border-slate-900 bg-gray-100 w-auto h-auto rounded-md shadow-md overflow-auto relative">
      <div className="mt-4">
        <p className="block text-lg font-bold"><b>Title: </b>{task.title}</p>
        <p><b>Description: </b>{task.description}</p>
        <p><b>Completed: </b>{task.complete ? 'Yes' : 'No'}</p>
        <p><b>Due Date: </b>{task.dueDate ? formatDate(task.dueDate.toString()) : 'No Due Date'}</p>
      </div>
      <div className="absolute bottom-2 right-2 cursor-pointer text-red-600" onClick={handleDelete(task._id)} >
        🗑
      </div>
    </div>
          ))
        )
}

export default Completed