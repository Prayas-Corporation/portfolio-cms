import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

// Define the type for work experience
type WorkExperience = {
  company: string;
  title: string;
  start: string;
  end: string;
  description: string;
  logoUrl?: string; // Add the logoUrl property
};

export default function WorkCMS() {
  const [workData, setWorkData] = useState<WorkExperience[]>([]);

  useEffect(() => {
    fetch('/api/work')
      .then((res) => res.json())
      .then((data) => setWorkData(data.work || []))
      .catch((error) => console.error('Error fetching work data:', error));
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWorkData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setWorkData((prevData) => {
          const newData = [...prevData];
          newData[index] = { ...newData[index], logoUrl: base64 };
          return newData;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExperience = () => {
    setWorkData((prevData) => [
      ...prevData,
      { company: '', title: '', start: '', end: '', description: '', logoUrl: '' },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    setWorkData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/work', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ work: workData }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error('Error updating work data:', error));
  };

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Update Work Experience</h1>
      <form onSubmit={handleSubmit}>
        {workData.map((work, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold mb-2">Job {index + 1}</h3>
            <div className="mb-4">
              <label className="block mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={work.company}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={work.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Start Date</label>
              <input
                type="text"
                name="start"
                value={work.start}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">End Date</label>
              <input
                type="text"
                name="end"
                value={work.end}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={work.description}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Logo</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                className="w-full p-2 border"
              />
              {work.logoUrl && (
                <img src={work.logoUrl} alt="Logo Preview" className="mt-2 h-20" />
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="bg-red-500 text-white py-1 px-3 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExperience}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        >
          Add Experience
        </button>
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
