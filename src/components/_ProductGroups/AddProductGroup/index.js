import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { collection, getDocs, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { navigate } from 'gatsby';

const AddProductGroup = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');
  const [approxPrice, setApproxPrice] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [category_id, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'category'));
      setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
    };

    fetchCategories();
  }, []);

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    setSlug(titleValue.toLowerCase().replace(/ /g, '-'));
  };

  const handleKeywordInput = (e) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert category_id to a Firestore DocumentReference
    const categoryRef = category_id ? doc(db, 'category', category_id) : null;

    await addDoc(collection(db, 'productGroup'), {
      title,
      slug,
      approxPrice: parseFloat(approxPrice),
      keywords,
      image,
      category_id: categoryRef, // Save as DocumentReference
      createdTime: serverTimestamp(),
      updatedTime: serverTimestamp(),
    });

    navigate('/productGroups');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Product Group</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter product group title"
        required
      />

      <label className="block mb-2 font-medium">Slug</label>
      <input
        type="text"
        value={slug}
        readOnly
        className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100"
      />

      <label className="block mb-2 font-medium">Image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter product group image"
        required
      />

      {image && <img src={image} alt="Product Group" className="mb-4" />}

      <label className="block mb-2 font-medium">Approximate Price (USD)</label>
      <input
        type="number"
        value={approxPrice}
        onChange={(e) => setApproxPrice(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter approximate price"
        required
      />

      <label className="block mb-2 font-medium">Keywords</label>
      <input
        type="text"
        value={keywordInput}
        onChange={(e) => setKeywordInput(e.target.value)}
        onKeyDown={handleKeywordInput}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="Enter a keyword and press Enter"
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {keywords.map((keyword, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded cursor-pointer">
            {keyword}
          </span>
        ))}
      </div>

      <label className="block mb-2 font-medium">Category</label>
      <select
        value={category_id}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Product Group
      </button>
    </form>
  );
};

export default AddProductGroup;
