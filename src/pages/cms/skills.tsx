import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';
import { Box, Button, TextField, Typography, IconButton, Grid, Card, CardContent, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function SkillsCMS() {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data.skills || []))
      .catch((error) => console.error('Error fetching skills data:', error));
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 , marginBottom:10}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Skills
        </Typography>
        <form onSubmit={handleSubmit}>
          {skills.map((skill, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label={`Skill ${index + 1}`}
                      value={skill}
                      onChange={(e:any) => handleChange(index, e)}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddSkill}
            
            >
              Add Skill
            </Button>
            <Button  sx={{ ml: 2 }} type="submit" variant="contained" color="secondary">
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </CMSLayout>
  );
}
