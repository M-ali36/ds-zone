import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from '@reach/router';

const ProductView = ({productId}) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'product', productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct(productSnap.data());
      } else {
        console.error('Product not found');
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <p className="text-gray-600">{`Product Group ID: {product.productGroupId}`}</p>
      <p className="text-gray-600">{`Unit Cost: ${product.unitCost}`}</p>
      <p className="text-gray-600">{`Link: <a href={product.link} target="_blank" rel="noopener noreferrer">{product.link}</a>`}</p>
      <p className="text-gray-600">{`State: {product.state}`}</p>
      <p className="text-gray-600">{`Estimated Shipping Cost: ${product.estShippingCost}`}</p>
      <p className="text-gray-600">{`Estimated Shipping Days: {product.estShippingDays}`}</p>
      <p className="text-gray-600">{`Supplier ID: {product.supplier_id}`}</p>
      <p className="text-gray-600">{`Comments: {product.comments?.join(', ')}`}</p>
      <p className="text-gray-600">{`Order: {product.order}`}</p>
      <Link to="/products" className="text-blue-500">Back to List</Link>
    </div>
  );
};

export default ProductView;
