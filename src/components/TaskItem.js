import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../assets/constants';
import { useNavigate } from 'react-router-dom';

const TaskItem = () => {
    const [task,SetTask]=useState([]);
    const id=useParams().id;
    const naviagte=useNavigate();
    function formatDate(dateString){
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
  };

  async function handleDelete(id){
    try {
      const response=await axios.delete("https://tsm-spf0.onrender.com/api/v1/"+id);
      naviagte('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  async function getTask() {
    try {
        const response = await axios.get(BASE_URL+"/"+id);
        SetTask(response?.data?.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  if(!task){
    return "Loading....";
  }
  return (
    <div key={task._id} className="m-4 p-4 max-w-xs container border-2 border-slate-900 bg-gray-100 w-auto h-auto rounded-md shadow-md relative">
      <div className="mt-4">
        <p className="block text-lg font-bold"><b>Title: </b>{task.title}</p>
        <p><b>Description: </b>{task.description}</p>
        <p><b>Completed: </b>{task.complete ? 'Yes' : 'No'}</p>
        <p><b>Due Date: </b>{task.dueDate ? formatDate(task.dueDate.toString()) : 'No Due Date'}</p>
      </div>
      <div className="absolute bottom-2 right-2 cursor-pointer text-red-600" onClick={() => handleDelete(task._id)}>
        🗑
      </div>
    </div>
  );
};

export default TaskItem;
