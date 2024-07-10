import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from "../assets/constants";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addTasks } from '../utils/taskSlice';


const Body = () => {
  const user = useSelector((store) => store?.user?.username);
  const [tasks, setTasks] = useState([]);
  const dispatch=useDispatch();

  function formatDate(dateString){
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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


  async function getTasks() {
    const response = await axios.get(BASE_URL);
    setTasks(response?.data?.data);
    dispatch(addTasks({tasks}));
  }

  useEffect(() => {
    getTasks();
  }, [tasks]);

  if (!user) {
    return (
      <div>
        Login To View Tasks
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        <button className="mt-4 text-grey-500 font-bold py-2 px-4 rounded">
          <Link to="/api/v1/addNewTask" className="text-grey-500">
            Add New Task
          </Link>
        </button>
        <button className=" text-grey-500 font-bold py-2 px-4 rounded">
          <Link to="/api/v1/complete" className="text-grey-500">
            Completed Tasks
          </Link>
        </button>
        <button className=" text-grey-500 font-bold py-2 px-4 rounded">
          <Link to="/api/v1/incomplete" className="text-grey-500">
            InComplete Tasks
          </Link>
        </button>
        {tasks.length === 0 ? (
          <div className="text-center col-span-4">
            <h1 className="font-bold text-xl text-gray-800">
              No Tasks
            </h1>
          </div>
        ) : (
          tasks.map((task) => (
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
        )}
        
      </div>
    );
  }
};

export default Body;
