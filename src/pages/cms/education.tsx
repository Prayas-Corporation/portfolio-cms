import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';

// Define the type for education experience
type EducationExperience = {
  school: string;
  degree: string;
  start: string;
  end: string;
  description: string;
  logoUrl?: string;
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
      <Box component={Paper} elevation={3} sx={{ p: 4, mx: 'auto', mt: 4, maxWidth: '900px', marginBottom:10 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Education
        </Typography>
        <form onSubmit={handleSubmit}>
          {educationData.map((education, index) => (
            <Box key={index} sx={{ mb: 6 }}>
              <Typography variant="h6" gutterBottom>
                School {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="School"
                    name="school"
                    value={education.school}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Degree"
                    name="degree"
                    value={education.degree}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    name="start"
                    value={education.start}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    name="end"
                    value={education.end}
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
                    value={education.description}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mr: 2, mt: 2 }}
                  >
                    Upload Logo
                    <input hidden type="file" onChange={(e) => handleFileChange(index, e)} />
                  </Button>
                  {education.logoUrl && (
                    <img
                      src={education.logoUrl}
                      alt="Logo Preview"
                      className="mt-2"
                      style={{ height: '80px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    />
                  )}
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveEducation(index)}
                sx={{ mt: 2 }}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddEducation}
             
            >
              Add Education
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
            >
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </CMSLayout>
  );
}
