import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { doc, getDoc, updateDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { navigate } from 'gatsby';
import { useParams } from '@reach/router';

const EditCategoryPage = ({categoryId}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [project_id, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryRef = doc(db, 'category', categoryId);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        const categoryData = categorySnap.data();
        setTitle(categoryData.title);
        setSlug(categoryData.slug);
        setDescriptions(categoryData.descriptions);
        setProjectId(categoryData.project_id);
        setLoading(false);
      } else {
        console.error('Category not found');
        navigate('/categories');
      }
    };

    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'project'));
      setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
    };

    fetchCategory();
    fetchProjects();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryRef = doc(db, 'category', categoryId);
      await updateDoc(categoryRef, {
        title,
        slug,
        descriptions,
        project_id,
        updatedTime: serverTimestamp(),
      });
      navigate('/categories');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    setSlug(titleValue.toLowerCase().replace(/ /g, '-'));
  };

  if (loading) {
    return <p>Loading category...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
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
        value={descriptions}
        onChange={(e) => setDescriptions(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
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
          <option key={project.id} value={`/project/${project.id}`}>
            {project.title}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditCategoryPage;
