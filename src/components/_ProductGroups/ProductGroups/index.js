import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'gatsby';

const ProductGroups = () => {
  const [productGroups, setProductGroups] = useState([]);

  useEffect(() => {
    const fetchProductGroups = async () => {
      const querySnapshot = await getDocs(collection(db, 'productGroup'));
      const productGroupsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductGroups(productGroupsData);
    };

    fetchProductGroups();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'productGroup', id));
    setProductGroups(productGroups.filter(group => group.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Product Groups List</h2>
      <Link to="/productGroups/addProductGroup" className="text-blue-500">Add New Product Group</Link>
      <ul>
        {productGroups.map((group) => (
          <li key={group.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-semibold">{group.title}</h3>
            <p className="text-gray-600">Approx Price: ${group.approxPrice}</p>
            <p className="text-gray-500">Slug: {group.slug}</p>
            <Link to={`/productGroup/${group.slug}`} className="text-blue-500 mr-2">View</Link>
            <Link to={`/productGroups/editProductGroup/${group.id}`} className="text-blue-500 mr-2">Edit</Link>
            <button onClick={() => handleDelete(group.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductGroups;
