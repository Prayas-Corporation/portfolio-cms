import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';

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
      <Box component={Paper} elevation={3} sx={{ p: 4, mx: 'auto', mt: 4, maxWidth: '900px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Certificates
        </Typography>
        <form onSubmit={handleSubmit}>
          {hackathons.map((hackathon, index) => (
            <Box key={index} sx={{ mb: 6 }}>
              <Typography variant="h6" gutterBottom>
               Certificates {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={hackathon.title}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={hackathon.description}
                    onChange={(e) => handleChange(index, e)}
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveHackathon(index)}
                    sx={{ mt: 2 }}
                  >
                    Remove Certificates
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Box sx={{ textAlign: 'center', mb:4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddHackathon}
             
            >
              Add Certificates
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
