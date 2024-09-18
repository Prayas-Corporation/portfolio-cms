import { useState, useEffect, useRef } from 'react';
import CMSLayout from '@/components/CMSLayout';
import { Box, Button, TextField, Typography, Card, CardContent, CardActions, Grid } from '@mui/material';

type Project = {
  title: string;
  description: string;
  gifUrl?: string;
  videoUrl?: string;
  youtubeLink?: string; // Add YouTube link prop
  githubLink?: string; // Add GitHub link prop
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
      <Typography variant="h4" component="h1" gutterBottom>
        Update Projects
      </Typography>
      <form onSubmit={handleSubmit}>
        {projects.map((project, index) => (
          <Card key={index} sx={{ mb: 4 }}>
            <CardContent >
              <Typography variant="h6" gutterBottom>
                Project {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={project.title}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="YouTube Link"
                    name="youtubeLink"
                    value={project.youtubeLink}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={project.description}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    multiline
                    rows={4}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="GitHub Link"
                    name="githubLink"
                    value={project.githubLink}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="GIF URL"
                    name="gifUrl"
                    value={project.gifUrl}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2 }}
                  >
                    Upload GIF
                    <input
                      hidden
                      type="file"
                      ref={(el) => {
                        inputFileRefs.current[index] = el;
                      }}
                      accept="image/gif"
                    />
                  </Button>
                  {project.gifUrl && (
                    <img
                      src={project.gifUrl}
                      alt="GIF Preview"
                      className="w-full h-auto mt-2"
                    />
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveProject(index)}
              >
                Remove Project
              </Button>
            </CardActions>
          </Card>
        ))}
        <Box sx={{ textAlign: 'center',marginBottom:10, alignItems:"center" }}>
          <Button variant="contained" color="primary" onClick={handleAddProject} >
            Add Project
          </Button>
          <Button type="submit" variant="contained" color="secondary" sx={{ ml: 2 }}>
            Update
          </Button>
        </Box>
      </form>
    </CMSLayout>
  );
}
