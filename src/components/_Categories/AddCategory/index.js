import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { navigate } from 'gatsby';

const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [project_id, setProjectId] = useState('');
  const [projects, setProjects] = useState([]); // For listing available projects

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'project'));
      setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
    };

    fetchProjects();
  }, []);

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    setSlug(titleValue.toLowerCase().replace(/ /g, '-'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'category'), {
      title,
      slug,
      descriptions,
      project_id,
      createdTime: serverTimestamp(),
      updatedTime: serverTimestamp(),
    });

    navigate('/categories');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Category</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter category title"
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
        value={descriptions}
        onChange={(e) => setDescriptions(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter category description"
        required
      />

      <label className="block mb-2 font-medium">Project</label>
      <select
        value={project_id}
        onChange={(e) => setProjectId(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      >
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={`/project/${project.id}`}>{project.title}</option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Category
      </button>
    </form>
  );
};

export default AddCategory;
