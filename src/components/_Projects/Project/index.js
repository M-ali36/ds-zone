import React, { useEffect, useState } from 'react';
import { db } from '@db'; // Adjust the path if necessary
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useParams, navigate } from '@reach/router';
import { Link } from 'gatsby';

const Project = ({slug}) => {
  const [project, setProject] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectBySlug = async () => {
      try {
        // Query for the project with the specified slug
        const projectsQuery = query(
          collection(db, 'project'),
          where('slug', '==', slug)
        );
        const querySnapshot = await getDocs(projectsQuery);
        
        if (!querySnapshot.empty) {
          const projectDoc = querySnapshot.docs[0];
          const projectData = projectDoc.data();
          setProject({ id: projectDoc.id, ...projectData });

          // Get a reference to the project document
          const projectRef = doc(db, 'project', projectDoc.id);

          // Fetch categories associated with this project reference
          const categoriesQuery = query(
            collection(db, 'category'),
            where('project_id', '==', projectRef) // Use the reference, not just the ID
          );
          const categoriesSnapshot = await getDocs(categoriesQuery);
          const categoriesList = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCategories(categoriesList);
        } else {
          console.error('Project not found');
          navigate('/projects'); // Redirect if project does not exist
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectBySlug();
  }, [slug]);

  if (loading) {
    return (
      <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
        <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
          <h6>Categories</h6>
        </div>
        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="p-4 overflow-x-auto">
            <p>Loading project and categories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
      <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
        <h6>Categories</h6>
      </div>
      <div className="flex-auto px-0 pt-0 pb-2">
        <div className="p-4 overflow-x-auto">
          {categories.length > 0 ? (
          <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
            <thead className="align-bottom">
              <tr>
                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Id</th>
                <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Title</th>
                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr>
                  <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <p className="mb-0 font-semibold leading-tight text-xs">{index}</p>
                  </td>
                  <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <div className="flex px-2 py-1 items-center">
                      <div>
                        <img src={`/images/${category.slug}.png`} className="inline-flex mb-0 items-center justify-center mr-4 text-white transition-all duration-200 ease-in-out text-sm h-9 w-9 rounded-xl" alt={category.title} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h6 className="mb-0 leading-normal text-sm">{category.title}</h6>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <Link to={`/category/${category.slug}`} className="infoBtn">view</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <p>No categories found for this project.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
