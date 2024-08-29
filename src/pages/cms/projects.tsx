import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

type Project = {
  title: string;
  description: string;
  gifUrl?: string;
  videoUrl?: string;
};

export default function ProjectsCMS() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .catch((error) => console.error('Error fetching projects data:', error));
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];
      newProjects[index] = { ...newProjects[index], [name]: value };
      return newProjects;
    });
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('video', file);

      fetch('/api/uploadVideo', {  // Make sure the endpoint is correct
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            setProjects((prevProjects) => {
              const newProjects = [...prevProjects];
              newProjects[index] = { ...newProjects[index], videoUrl: data.url };
              return newProjects;
            });
          } else {
            console.error('Video upload failed:', data.error);
          }
        })
        .catch((error) => console.error('Error uploading video:', error));
    }
  };

  const handleAddProject = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { title: '', description: '', gifUrl: '', videoUrl: '' },
    ]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/projects', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projects }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error('Error updating projects data:', error));
  };

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Update Projects</h1>
      <form onSubmit={handleSubmit}>
        {projects.map((project, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold mb-2">Project {index + 1}</h3>
            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-1">GIF URL</label>
              <input
                type="text"
                name="gifUrl"
                value={project.gifUrl}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Upload Video</label>
              <input
                type="file"
                name="videoFile"
                accept="video/*"
                onChange={(e) => handleFileChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Video URL</label>
              <input
                type="text"
                name="videoUrl"
                value={project.videoUrl}
                readOnly
                className="w-full p-2 border"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveProject(index)}
              className="bg-red-500 text-white py-1 px-3 rounded mt-2"
            >
              Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddProject}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        >
          Add Project
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
