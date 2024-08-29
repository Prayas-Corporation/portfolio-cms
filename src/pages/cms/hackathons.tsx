import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

export default function HackathonsCMS() {
  const [hackathons, setHackathons] = useState<{ title: string; description: string; [key: string]: string }[]>([]);

  useEffect(() => {
    fetch('/api/hackathons')
      .then((res) => res.json())
      .then((data) => setHackathons(data.hackathons || []))
      .catch((error) => console.error('Error fetching hackathons data:', error));
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHackathons((prevHackathons) => {
      const newHackathons = [...prevHackathons];
      newHackathons[index] = { ...newHackathons[index], [name]: value };
      return newHackathons;
    });
  };

  const handleAddHackathon = () => {
    setHackathons((prevHackathons) => [
      ...prevHackathons,
      { title: '', description: '' },
    ]);
  };

  const handleRemoveHackathon = (index: number) => {
    setHackathons((prevHackathons) => prevHackathons.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/hackathons', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hackathons }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error('Error updating hackathons data:', error));
  };

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Update Hackathons</h1>
      <form onSubmit={handleSubmit}>
        {hackathons.map((hackathon, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold mb-2">Hackathon {index + 1}</h3>
            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={hackathon.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={hackathon.description}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              ></textarea>
            </div>
            {/* Add other fields as needed */}
            <button
              type="button"
              onClick={() => handleRemoveHackathon(index)}
              className="bg-red-500 text-white py-1 px-3 rounded mt-2"
            >
              Remove Hackathon
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddHackathon}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        >
          Add Hackathon
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
