import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function SummaryCMS() {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    fetch('/api/summary')
      .then((res) => res.json())
      .then((data) => setSummary(data.summary || ''));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/summary', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summary }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <CMSLayout>
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Summary
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Summary"
            name="summary"
            value={summary}
            onChange={handleChange}
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update
          </Button>
        </form>
      </Box>
    </CMSLayout>
  );
}
