import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { navigate } from 'gatsby';

const AddProduct = () => {
  const [productGroupId, setProductGroupId] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [link, setLink] = useState('');
  const [state, setState] = useState('enabled');
  const [estShippingCost, setEstShippingCost] = useState('');
  const [estShippingDays, setEstShippingDays] = useState('');
  const [supplier_id, setSupplierId] = useState('');
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [order, setOrder] = useState(0);
  const [productGroups, setProductGroups] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchProductGroups = async () => {
      const querySnapshot = await getDocs(collection(db, 'productGroup'));
      setProductGroups(querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
    };

    const fetchSuppliers = async () => {
      const querySnapshot = await getDocs(collection(db, 'supplier'));
      setSuppliers(querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
    };

    fetchProductGroups();
    fetchSuppliers();
  }, []);

  const handleCommentInput = (e) => {
    if (e.key === 'Enter' && commentInput.trim()) {
      e.preventDefault();
      setComments([...comments, commentInput.trim()]);
      setCommentInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'product'), {
      productGroupId,
      unitCost: parseFloat(unitCost),
      link,
      state,
      estShippingCost: parseFloat(estShippingCost),
      estShippingDays: parseInt(estShippingDays, 10),
      supplier_id,
      comments,
      order: parseInt(order, 10),
      createdTime: serverTimestamp(),
      updatedTime: serverTimestamp(),
    });

    navigate('/products');
  };

  function getProductIdFromLink(url) {
      const regex = /-p-([A-Z0-9-]+)\.html/;
      const match = url.match(regex);
      return match ? match[1] : null;
  }

  const changeLink = async (e) => {
    const productId = getProductIdFromLink(e.target.value);

    setLink(e.target.value);
    try {
      const response = await fetch("/api/cj/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response) {
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();
      console.log(data)
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      <label className="block mb-2 font-medium">Product Group</label>
      <select
        value={productGroupId}
        onChange={(e) => setProductGroupId(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      >
        <option value="">Select a product group</option>
        {productGroups.map((group) => (
          <option key={group.id} value={group.id}>{group.title}</option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Unit Cost (USD)</label>
      <input
        type="number"
        value={unitCost}
        onChange={(e) => setUnitCost(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter unit cost"
        required
      />

      <label className="block mb-2 font-medium">Link</label>
      <input
        type="url"
        value={link}
        onChange={(e) => changeLink(e)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="https://example.com"
        required
      />

      <label className="block mb-2 font-medium">State</label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      >
        <option value="enabled">Enabled</option>
        <option value="disabled">Disabled</option>
      </select>

      <label className="block mb-2 font-medium">Estimated Shipping Cost (USD)</label>
      <input
        type="number"
        value={estShippingCost}
        onChange={(e) => setEstShippingCost(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter estimated shipping cost"
      />

      <label className="block mb-2 font-medium">Estimated Shipping Days</label>
      <input
        type="number"
        value={estShippingDays}
        onChange={(e) => setEstShippingDays(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter estimated shipping days"
      />

      <label className="block mb-2 font-medium">Supplier</label>
      <select
        value={supplier_id}
        onChange={(e) => setSupplierId(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      >
        <option value="">Select a supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>{supplier.title}</option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Comments</label>
      <input
        type="text"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        onKeyDown={handleCommentInput}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="Enter a comment and press Enter"
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {comments.map((comment, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded">
            {comment}
          </span>
        ))}
      </div>

      <label className="block mb-2 font-medium">Order</label>
      <input
        type="number"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter order"
        defaultValue={0}
      />

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
