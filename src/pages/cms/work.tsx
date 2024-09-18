import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import CMSLayout from '@/components/CMSLayout';

type WorkExperience = {
  company: string;
  title: string;
  start: string;
  end: string;
  description: string;
  logoUrl?: string;
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
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2, marginBottom:10 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Work Experience
        </Typography>
        <form onSubmit={handleSubmit}>
          {workData.map((work, index) => (
            <Box key={index} sx={{ mb: 6 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Job {index + 1}
              </Typography>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={work.company}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={work.title}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Start Date"
                name="start"
                value={work.start}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="End Date"
                name="end"
                value={work.end}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={work.description}
                onChange={(e) => handleChange(index, e)}
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mr: 2 }}
                >
                  Upload Logo
                  <input hidden type="file" onChange={(e) => handleFileChange(index, e)} />
                </Button>
                {work.logoUrl && (
                  <Avatar
                    src={work.logoUrl}
                    alt="Logo Preview"
                    sx={{ width: 80, height: 80 }}
                  />
                )}
              </Box>
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={() => handleRemoveExperience(index)}
                sx={{ mt: 2 }}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            type="button"
            variant="contained"
            color="success"
            onClick={handleAddExperience}
            sx={{ mt: 2 }}
          >
            Add Experience
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 4 }}
          >
            Update
          </Button>
        </form>
      </Box>
    </CMSLayout>
  );
}
