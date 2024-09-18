"use client";
import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import CMSLayout from '@/components/CMSLayout';

interface HeroData {
  _id?: string;
  name: string;
  description: string;
  avatarUrl: string;
}

export default function HeroCMS() {
  const [heroData, setHeroData] = useState<HeroData>({
    name: '',
    description: '',
    avatarUrl: '',
  });

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => setHeroData(data))
      .catch((error) => console.error('Error fetching hero data:', error));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroData((prev) => ({
          ...prev,
          avatarUrl: reader.result as string, // Convert to Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { _id, ...updateData } = heroData;

    fetch('/api/hero', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error in form submission:', error);
        alert('An error occurred while updating the hero section.');
      });
  };

  return (
    <CMSLayout>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Your Section
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={heroData.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={heroData.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          required
        />

        <TextField
          fullWidth
          label="Avatar URL"
          name="avatarUrl"
          value={heroData.avatarUrl}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          placeholder="Paste image URL or upload below"
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{ mr: 2 }}
          >
            Upload Profile Image
            <input hidden type="file" onChange={handleFileChange} />
          </Button>
          {heroData.avatarUrl && (
            <Avatar
              src={heroData.avatarUrl}
              alt="Profile"
              sx={{
                width: 80,
                height: 80,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          )}
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </CMSLayout>
  );
}
