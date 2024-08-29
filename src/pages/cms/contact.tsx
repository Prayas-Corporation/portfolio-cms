import { useState, useEffect } from 'react';
import CMSLayout from '@/components/CMSLayout';

export default function ContactCMS() {
  const [contactData, setContactData] = useState<any>({
    email: '',
    tel: '',
    social: {},
  });

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => setContactData(data.contact || {}));
  }, []);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setContactData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialChange = (platform:any, e:any) => {
    const { name, value } = e.target;
    setContactData((prevData:any) => ({
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

  const handleSubmit = (e:any) => {
    e.preventDefault();
    fetch('/api/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact: contactData }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Update Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="tel"
            value={contactData.tel}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        {Object.keys(contactData.social).map((platform:any) => (
          <div key={platform} className="mb-4">
            <h3 className="font-semibold mb-2">{platform}</h3>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={contactData.social[platform]?.name || ''}
              onChange={(e) => handleSocialChange(platform, e)}
              className="w-full p-2 border"
            />
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
          Update
        </button>
      </form>
    </CMSLayout>
  );
}
