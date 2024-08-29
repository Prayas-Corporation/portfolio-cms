import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

// Define the type for education experience
type EducationExperience = {
  school: string;
  degree: string;
  start: string;
  end: string;
  description: string;
  logoUrl?: string; // Add the logoUrl property
};

export default function EducationCMS() {
  const [educationData, setEducationData] = useState<EducationExperience[]>([]);

  useEffect(() => {
    fetch('/api/education')
      .then((res) => res.json())
      .then((data) => setEducationData(data.education || []))
      .catch((error) => console.error('Error fetching education data:', error));
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducationData((prevData) => {
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
        setEducationData((prevData) => {
          const newData = [...prevData];
          newData[index] = { ...newData[index], logoUrl: base64 };
          return newData;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEducation = () => {
    setEducationData((prevData) => [
      ...prevData,
      { school: '', degree: '', start: '', end: '', description: '', logoUrl: '' },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducationData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/education', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ education: educationData }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error('Error updating education data:', error));
  };

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Update Education</h1>
      <form onSubmit={handleSubmit}>
        {educationData.map((education, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold mb-2">School {index + 1}</h3>
            <div className="mb-4">
              <label className="block mb-1">School</label>
              <input
                type="text"
                name="school"
                value={education.school}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Degree</label>
              <input
                type="text"
                name="degree"
                value={education.degree}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Start Date</label>
              <input
                type="text"
                name="start"
                value={education.start}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">End Date</label>
              <input
                type="text"
                name="end"
                value={education.end}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={education.description}
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
              {education.logoUrl && (
                <img src={education.logoUrl} alt="Logo Preview" className="mt-2 h-20" />
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="bg-red-500 text-white py-1 px-3 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEducation}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        >
          Add Education
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
