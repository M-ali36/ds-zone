import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from '@reach/router';

const Supplier = ({slug}) => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplierBySlug = async () => {
      try {
        // Query the Suppliers collection to find the supplier with the matching slug
        const suppliersQuery = query(
          collection(db, 'supplier'),
          where('slug', '==', slug)
        );
        const querySnapshot = await getDocs(suppliersQuery);

        if (!querySnapshot.empty) {
          const supplierDoc = querySnapshot.docs[0]; // Get the first matching document
          setSupplier(supplierDoc.data());
        } else {
          console.error('Supplier not found');
        }
      } catch (error) {
        console.error('Error fetching supplier:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierBySlug();
  }, [slug]);

  if (loading) return <p>Loading supplier...</p>;
  if (!supplier) return <p>Supplier not found</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">{supplier.title}</h2>
      <p className="text-gray-600">Slug: {supplier.slug}</p>
      <p className="text-gray-600">Contact Name: {supplier.contactName}</p>
      <p className="text-gray-600">Email: {supplier.email}</p>
      <p className="text-gray-600">Phone: {supplier.phone}</p>
      <p className="text-gray-600">Skype: {supplier.skype}</p>
      <p className="text-gray-600">Location: {supplier.location}</p>
      <p className="text-gray-600">Annual Revenue: ${supplier.annualRevenue}</p>
      <p className="text-gray-600">Start Date: {supplier.startDate?.toDate().toLocaleDateString()}</p>
      <p className="text-gray-600">Website: <a href={supplier.website} target="_blank" rel="noopener noreferrer">{supplier.website}</a></p>
      <p className="text-gray-600">Comments: {supplier.comments?.join(', ')}</p>
      <Link to="/suppliers" className="text-blue-500">Back to List</Link>
    </div>
  );
};

export default Supplier;
