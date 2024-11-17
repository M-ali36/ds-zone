import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'gatsby';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'project'));
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'project', id));
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Projects List</h2>
      <Link to="/projects/addProject" className="text-blue-500">Add New Project</Link>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-semibold"><Link to={`/project/${project.slug}`} className="text-blue-500">{project.title}</Link></h3>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-gray-500">Slug: {project.slug}</p>
            <Link to={`/projects/editProject/${project.id}`} className="text-blue-500 mr-2">Edit</Link>
            <button onClick={() => handleDelete(project.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
