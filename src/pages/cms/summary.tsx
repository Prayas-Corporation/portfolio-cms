import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

export default function SummaryCMS() {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    fetch('/api/summary')
      .then((res) => res.json())
      .then((data) => setSummary(data.summary || ''));
  }, []);

  const handleChange = (e:any) => {
    setSummary(e.target.value);
  };

  const handleSubmit = (e:any) => {
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
      <h1 className="text-2xl font-bold mb-4">Update Summary</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Summary</label>
          <textarea
            name="summary"
            value={summary}
            onChange={handleChange}
            className="w-full p-2 border"
          ></textarea>
        </div>
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
