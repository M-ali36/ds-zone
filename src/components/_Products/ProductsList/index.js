import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'gatsby';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'product'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'product', id));
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <Link to="/products/addProduct" className="text-blue-500">Add New Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-semibold">Product ID: {product.id}</h3>
            <p className="text-gray-500">Unit Cost: ${product.unitCost}</p>
            <p className="text-gray-500">State: {product.state}</p>
            <p className="text-gray-500">Estimated Shipping Cost: ${product.estShippingCost}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500 mr-2">View</Link>
            <Link to={`/products/editProduct/${product.id}`} className="text-blue-500 mr-2">Edit</Link>
            <button onClick={() => handleDelete(product.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
