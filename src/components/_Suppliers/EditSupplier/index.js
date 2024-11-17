import React, { useState, useEffect } from 'react';
import { db } from '@db';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { navigate } from '@reach/router';

const EditSupplier = ({supplierId}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skype, setSkype] = useState('');
  const [location, setLocation] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [website, setWebsite] = useState('');
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      const supplierRef = doc(db, 'supplier', supplierId);
      const supplierSnap = await getDoc(supplierRef);

      if (supplierSnap.exists()) {
        const supplierData = supplierSnap.data();
        setTitle(supplierData.title);
        setSlug(supplierData.slug);
        setContactName(supplierData.contactName);
        setEmail(supplierData.email);
        setPhone(supplierData.phone);
        setSkype(supplierData.skype);
        setLocation(supplierData.location);
        setAnnualRevenue(supplierData.annualRevenue);
        setStartDate(supplierData.startDate ? supplierData.startDate.toDate().toISOString().split('T')[0] : '');
        setWebsite(supplierData.website);
        setComments(supplierData.comments || []);
        setLoading(false);
      } else {
        console.error('Supplier not found');
        navigate('/suppliers');
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
    setSlug(titleValue.toLowerCase().replace(/ /g, '-'));
  };

  const handleCommentInput = (e) => {
    if (e.key === 'Enter' && commentInput.trim()) {
      e.preventDefault();
      setComments([...comments, commentInput.trim()]);
      setCommentInput('');
    }
  };

  const handleRemoveComment = (comment) => {
    setComments(comments.filter(c => c !== comment));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierRef = doc(db, 'supplier', supplierId);
    await updateDoc(supplierRef, {
      title,
      slug,
      contactName,
      email,
      phone,
      skype,
      location,
      annualRevenue: annualRevenue, // changed to string phrase
      startDate: startDate ? new Date(startDate) : null,
      website,
      comments,
      updatedTime: serverTimestamp(),
    });

    navigate('/suppliers');
  };

  if (loading) return <p>Loading supplier details...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Supplier</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter supplier title"
        required
      />

      <label className="block mb-2 font-medium">Slug</label>
      <input
        type="text"
        value={slug}
        readOnly
        className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100"
      />

      <label className="block mb-2 font-medium">Contact Name</label>
      <input
        type="text"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />

      <label className="block mb-2 font-medium">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />

      <label className="block mb-2 font-medium">Phone</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />

      <label className="block mb-2 font-medium">Skype</label>
      <input
        type="text"
        value={skype}
        onChange={(e) => setSkype(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label className="block mb-2 font-medium">Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label className="block mb-2 font-medium">Annual Revenue</label>
      <input
        type="text"
        value={annualRevenue}
        onChange={(e) => setAnnualRevenue(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter annual revenue"
      />

      <label className="block mb-2 font-medium">Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label className="block mb-2 font-medium">Website</label>
      <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="https://example.com"
      />

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
          <span
            key={index}
            className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
            onClick={() => handleRemoveComment(comment)}
          >
            {comment}
          </span>
        ))}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditSupplier;
