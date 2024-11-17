import React, { useState } from 'react';
import { db } from '@db';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { navigate } from 'gatsby';

const AddSupplier = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'supplier'), {
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
      createdTime: serverTimestamp(),
      updatedTime: serverTimestamp(),
    });

    navigate('/suppliers');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>

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

      <label className="block mb-2 font-medium">Annual Revenue (USD)</label>
      <input
        type="number"
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
          <span key={index} className="bg-gray-200 px-2 py-1 rounded">
            {comment}
          </span>
        ))}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Supplier
      </button>
    </form>
  );
};

export default AddSupplier;
