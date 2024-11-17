import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'gatsby';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'category'));
      const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'category', id));
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Categories List</h2>
      <Link to="/categories/addCategory" className="text-blue-500">Add New Category</Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-semibold">{category.title}</h3>
            <p className="text-gray-600">{category.descriptions}</p>
            <p className="text-gray-500">Slug: {category.slug}</p>
            <Link to={`/categories/editCategory/${category.id}`} className="text-blue-500 mr-2">Edit</Link>
            <button onClick={() => handleDelete(category.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
