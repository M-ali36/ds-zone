import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { doc, getDoc, updateDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { useParams, navigate } from '@reach/router';

const EditProductGroup = ({ productGroupId }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');
  const [approxPrice, setApproxPrice] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [category_id, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [docId, setDocId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductGroup = async () => {
      const productGroupRef = doc(db, 'productGroup', productGroupId);
      const productGroupSnap = await getDoc(productGroupRef);

      if (productGroupSnap.exists()) {
        const productGroupData = productGroupSnap.data();
        setDocId(productGroupSnap.id);
        setTitle(productGroupData.title);
        setImage(productGroupData.image);
        setSlug(productGroupData.slug);
        setApproxPrice(productGroupData.approxPrice);
        setKeywords(productGroupData.keywords || []);
        setCategoryId(productGroupData.category_id?.path || ''); // Handle reference field
        setLoading(false);
      } else {
        console.error('Product group not found');
        navigate('/productGroups');
      }
    };

    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'category'));
      setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
    };

    fetchProductGroup();
    fetchCategories();
  }, [productGroupId]);

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

  const handleRemoveKeyword = (keyword) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryRef = category_id ? doc(db, category_id) : null; // Convert to DocumentReference if category_id exists

    const productGroupRef = doc(db, 'productGroup', productGroupId);
    await updateDoc(productGroupRef, {
      title,
      slug,
      approxPrice: parseFloat(approxPrice),
      keywords,
      image,
      category_id: categoryRef, // Save as DocumentReference
      updatedTime: serverTimestamp(),
    });

    navigate('/productGroups');
  };

  if (loading) return <p>Loading product group...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Product Group</h2>

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
        placeholder="Enter product group Image"
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
          <span
            key={index}
            className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
            onClick={() => handleRemoveKeyword(keyword)}
          >
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
          <option key={category.id} value={`category/${category.id}`}>
            {category.title}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProductGroup;
