import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

export default function ContactCMS() {
  // Initialize state with default social structure
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
          // Merge fetched data with default structure to prevent missing keys
          setContactData((prevData: any) => ({
            ...prevData,
            social: {
              ...prevData.social,
              ...data.contact.social, // Merge with fetched social data
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
        // Optional: You can set a fallback error state here if needed
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
    // Only send the updated social media URLs
    const updatedSocialUrls = Object.keys(contactData.social).reduce((acc: any, platform: any) => {
      acc[platform] = { url: contactData.social[platform]?.url };
      return acc;
    }, {});

    fetch('/api/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact: { social: updatedSocialUrls } }), // Send only the updated URLs
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Update Social Media URLs</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(contactData.social).map((platform: any) => (
          <div key={platform} className="mb-4">
            <h3 className="font-semibold mb-2">{platform}</h3>
            <label className="block mb-1">URL</label>
            <input
              type="text"
              name="url"
              value={contactData.social[platform]?.url || ''}
              onChange={(e) => handleSocialChange(platform, e)}
              className="w-full p-2 border"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update URLs
        </button>
      </form>
    </CMSLayout>
  );
}
