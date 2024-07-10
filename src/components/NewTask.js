import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, MAIN_URL } from "../assets/constants";
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [complete, setComplete] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, complete, dueDate };

    try {
      const response = await axios.post(BASE_URL, newTask);
      setTitle('');
      setDescription('');
      setComplete(false);
      setDueDate('');
      navigate('/');
    } catch (error) {
      console.error("There was an error creating the task!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-4 p-4 max-w-xs container border-2 border-slate-900 bg-gray-100 w-auto h-auto rounded-md shadow-md">
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2" htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2" htmlFor="complete">Completed</label>
        <input
          type="checkbox"
          id="complete"
          checked={complete}
          onChange={(e) => setComplete(e.target.checked)}
          className="mr-2"
        />
        <span>{complete ? 'Yes' : 'No'}</span>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2" htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Task</button>
    </form>
  );
};

export default CreateTask;
