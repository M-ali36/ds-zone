import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'gatsby';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const querySnapshot = await getDocs(collection(db, 'supplier'));
      const suppliersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuppliers(suppliersData);
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'supplier', id));
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
      <Link to="/suppliers/addSupplier" className="text-blue-500">Add New Supplier</Link>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-semibold">{supplier.title}</h3>
            <p className="text-gray-500">Slug: {supplier.slug}</p>
            <p className="text-gray-500">Contact Name: {supplier.contactName}</p>
            <p className="text-gray-500">Email: {supplier.email}</p>
            <Link to={`/supplier/${supplier.slug}`} className="text-blue-500 mr-2">View</Link>
            <Link to={`/suppliers/editSupplier/${supplier.id}`} className="text-blue-500 mr-2">Edit</Link>
            <button onClick={() => handleDelete(supplier.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuppliersList;
