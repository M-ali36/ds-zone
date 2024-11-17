import React, { useState } from 'react';
import { db } from '@db';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { navigate } from 'gatsby';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    setSlug(titleValue.toLowerCase().replace(/ /g, '-')); // Generate slug from title
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'project'), {
      title,
      slug,
      description,
      createdTime: serverTimestamp(),
      updatedTime: serverTimestamp(),
    });

    navigate('/projects'); // Redirect to the projects list after submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Project</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter project title"
        required
      />

      <label className="block mb-2 font-medium">Slug</label>
      <input
        type="text"
        value={slug}
        readOnly
        className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100"
      />

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter project description"
        required
      />

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProject;
