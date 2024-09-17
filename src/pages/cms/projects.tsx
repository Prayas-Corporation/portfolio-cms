import { useState, useEffect, useRef } from 'react';
import CMSLayout from '@/components/CMSLayout';

type Project = {
  title: string;
  description: string;
  gifUrl?: string;
  videoUrl?: string;
  youtubeLink?: string; // Add YouTube link prop
  githubLink?: string; 
};

export default function ProjectsCMS() {
  const [projects, setProjects] = useState<Project[]>([]);
  const inputFileRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleGifUpload = async (index: number, e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = inputFileRefs.current[index];
    if (!fileInput?.files?.length) {
      throw new Error('No file selected');
    }
    const file = fileInput.files[0];
    const response = await fetch(`/api/uploadGif?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });

    const data = await response.json();
    if (data.url) {
      setProjects((prevProjects) => {
        const newProjects = [...prevProjects];
        newProjects[index] = { ...newProjects[index], gifUrl: data.url };
        return newProjects;
      });
    } else {
      console.error('Error uploading GIF:', data.error);
    }
  };

  const handleAddProject = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { title: '', description: '', gifUrl: '', youtubeLink: '', githubLink: '' },
    ]);
    inputFileRefs.current.push(null);
  };

  const handleRemoveProject = (index: number) => {
    setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
    inputFileRefs.current.splice(index, 1);
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
              <label className="block mb-1">YouTube Link</label>
              <input
                type="text"
                name="youtubeLink"
                value={project.youtubeLink}
                onChange={(e) => handleChange(index, e)} // Add YouTube input
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">GitHub Link</label>
              <input
                type="text"
                name="githubLink"
                value={project.githubLink}
                onChange={(e) => handleChange(index, e)} // Add GitHub input
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Upload GIF</label>
              <input
                type="file"
                ref={(el) => {
                  inputFileRefs.current[index] = el;
                }}
                accept="image/gif"
                className="w-full p-2 border"
              />
              <button
                type="button"
                onClick={(e) => handleGifUpload(index, e)}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
              >
                Upload GIF
              </button>
            </div>
            {project.gifUrl && (
              <div className="mb-4">
                <label className="block mb-1">GIF Preview</label>
                <img src={project.gifUrl} alt="GIF Preview" className="w-full h-auto" />
              </div>
            )}
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

