import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';

export default function ContactCMS() {
  const [contactData, setContactData] = useState<any>({
    social: {
      GitHub: { url: '' },
      LinkedIn: { url: '' },
      X: { url: '' },
      Youtube: { url: '' },
    },
  });

  useEffect(() => {
    // Fetch the contact data on component mount
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.contact && data.contact.social) {
          // Merge fetched data with default structure
          setContactData((prevData: any) => ({
            ...prevData,
            social: {
              ...prevData.social,
              ...data.contact.social,
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  }, []);

  const handleSocialChange = (platform: any, e: any) => {
    const { name, value } = e.target;
    setContactData((prevData: any) => ({
      ...prevData,
      social: {
        ...prevData.social,
        [platform]: {
          ...prevData.social[platform],
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedSocialUrls = Object.keys(contactData.social).reduce((acc: any, platform: any) => {
      acc[platform] = { url: contactData.social[platform]?.url };
      return acc;
    }, {});

    fetch('/api/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact: { social: updatedSocialUrls } }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <CMSLayout>
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mt: 4,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
        component={Paper}
        elevation={3}
      >
        <Typography variant="h4" component="h1" gutterBottom className="text-center font-bold">
          Update Social Media URLs
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(contactData.social).map((platform: any) => (
              <Grid item xs={12} key={platform}>
                <TextField
                  fullWidth
                  label={`${platform} URL`}
                  name="url"
                  value={contactData.social[platform]?.url || ''}
                  onChange={(e) => handleSocialChange(platform, e)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { fontWeight: 'bold' },
                  }}
                  sx={{
                    '& input': {
                      color: 'text.primary',
                      py: 1.5,
                    },
                    '& label': {
                      color: 'text.secondary',
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                py: 1.5,
                px: 4,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Update URLs
            </Button>
          </Box>
        </form>
      </Box>
    </CMSLayout>
  );
}
