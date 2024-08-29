import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

export default function SkillsCMS() {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data.skills || []))
      .catch((error) => console.error('Error fetching skills data:', error));
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      newSkills[index] = value;
      return newSkills;
    });
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, '']);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/skills', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error('Error updating skills data:', error));
  };

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Update Skills</h1>
      <form onSubmit={handleSubmit}>
        {skills.map((skill, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1">Skill {index + 1}</label>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleChange(index, e)}
              className="w-full p-2 border"
            />
            <button
              type="button"
              onClick={() => handleRemoveSkill(index)}
              className="bg-red-500 text-white py-1 px-3 rounded mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSkill}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        >
          Add Skill
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
