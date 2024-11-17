import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { navigate } from 'gatsby';

const EditProject = ({ projectId }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      const projectRef = doc(db, 'project', projectId);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        const projectData = projectSnap.data();
        setTitle(projectData.title);
        setSlug(projectData.slug);
        setDescription(projectData.description);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectRef = doc(db, 'project', projectId);
    await updateDoc(projectRef, {
      title,
      slug,
      description,
      updatedTime: serverTimestamp(),
    });

    navigate('/projects');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Project</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
        }}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
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
        required
      />

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProject;
