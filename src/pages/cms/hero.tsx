"use client";
import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

interface HeroData {
  _id?: string;
  name: string;
  description: string;
  avatarUrl: string;
}

export default function HeroCMS() {
  const [heroData, setHeroData] = useState<HeroData>({
    name: '',
    description: '',
    avatarUrl: '',
  });

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => setHeroData(data))
      .catch((error) => console.error('Error fetching hero data:', error));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroData((prev) => ({
          ...prev,
          avatarUrl: reader.result as string, // Convert to Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Destructure to exclude _id from the update data
    const { _id, ...updateData } = heroData;

    fetch('/api/hero', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error in form submission:', error);
        alert('An error occurred while updating the hero section.');
      });
  };

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Update Hero Section</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={heroData.name}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={heroData.description}
            onChange={handleChange}
            className="w-full p-2 border"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Avatar URL</label>
          <input
            type="text"
            name="avatarUrl"
            value={heroData.avatarUrl}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Upload Profile Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border"
          />
          {heroData.avatarUrl && (
            <img
              src={heroData.avatarUrl}
              alt="Profile"
              className="mt-4 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </CMSLayout>
  );
}
