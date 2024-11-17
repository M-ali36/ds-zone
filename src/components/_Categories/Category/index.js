import React, { useEffect, useState } from 'react';
import { db } from '@db'; // Adjust the path if necessary
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useParams, navigate } from '@reach/router';
import {Link} from 'gatsby'

const Category = ({slug}) => {
  const [category, setCategory] = useState(null);
  const [productGroups, setProductGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryBySlug = async () => {
      try {
        // Query for the category with the specified slug
        const categoriesQuery = query(
          collection(db, 'category'),
          where('slug', '==', slug)
        );
        const querySnapshot = await getDocs(categoriesQuery);

        if (!querySnapshot.empty) {
          const categoryDoc = querySnapshot.docs[0];
          const categoryData = categoryDoc.data();
          setCategory({ id: categoryDoc.id, ...categoryData });

          // Fetch product groups associated with this category
          const categoryRef = doc(db, 'category', categoryDoc.id);
          const productGroupsQuery = query(
            collection(db, 'productGroup'),
            where('category_id', '==', categoryRef) // Use category document reference
          );
          const productGroupsSnapshot = await getDocs(productGroupsQuery);
          const productGroupsList = productGroupsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProductGroups(productGroupsList);
        } else {
          console.error('Category not found');
          navigate('/categories'); // Redirect if category does not exist
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBySlug();
  }, [slug]);

  if (loading) return <p>Loading category and product groups...</p>;

  return (
    <div className="container mx-auto py-10">
      {category && (
        <div className="relative flex min-w-0 mb-10 px-4 break-words bg-white shadow rounded-2xl bg-clip-border items-center">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                <div className="flex flex-col h-full">
                  <h5 className="font-bold">{category.title}</h5>
                  <p className="mb-12">{category.descriptions}</p>
                  <div className="flex gap-4">
                    <Link to={`/categories/editCategory/${category.id}`}>edit</Link>
                  </div>
                </div>
              </div>
              <div className="max-w-full ml-auto text-center lg:mt-0 w-24 lg:flex-none">
                <div className="rounded-xl">
                  <img src={`/images/${category.slug}.png`} className="" alt={category.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      <h2 className="text-2xl font-semibold mb-4">Product Groups</h2>
      
      <div className="relative flex min-w-0 mb-10 px-4 break-words bg-white shadow rounded-2xl bg-clip-border items-center">
        <div className="flex-auto p-4">
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-4 overflow-x-auto">
              {productGroups.length > 0 ? (
              <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Id</th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Title</th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Keywords</th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Approx Price</th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Created time</th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productGroups.map((productGroup, index) => (
                    <tr>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <p className="mb-0 font-semibold leading-tight text-xs">{index}</p>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <div className="flex px-2 py-1 items-center">
                          <div>
                            <img src={`/images/${productGroup.slug}.png`} className="inline-flex mb-0 items-center justify-center mr-4 text-white transition-all duration-200 ease-in-out text-sm h-9 w-9 rounded-xl" alt={category.title} />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h6 className="mb-0 leading-normal text-sm">{productGroup.title}</h6>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        {productGroup.approxPrice}
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        {productGroup.keywords?.join(', ')}
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        {productGroup.createdTime?.toDate().toLocaleString()}
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <Link to={`/productGroup/${productGroup.slug}`} className="infoBtn">view</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <p>No product groups found for this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
