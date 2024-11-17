import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'gatsby'

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get('/api/getData');
      setProjects(response.data.projects);
    };
    fetchProjects();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-4">
      {projects?.map((project) => (
        <div className="lg:col-span-1 col-span-4">
          <div key={project.id} className="bg-white p-8 border border-slate-300 rounded-xl">
            <Link to={`/project/${project.slug}`}>
              <h2 className="txet-lg">{project.title}</h2>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
