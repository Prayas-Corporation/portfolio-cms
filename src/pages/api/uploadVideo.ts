import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disables Next.js default body parsing so formidable can handle it
  },
};

// Ensure the directory exists
const uploadDir = path.join(process.cwd(), '/public/uploads/videos');
fs.mkdirSync(uploadDir, { recursive: true });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      multiples: false, // Only one file can be uploaded at a time
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing the files:', err);
        return res.status(500).json({ error: 'Error parsing the files' });
      }

      const file = Array.isArray(files.video) ? files.video[0] : files.video;

      if (!file) {
        console.error('No video file uploaded');
        return res.status(400).json({ error: 'No video file uploaded' });
      }

      const videoUrl = `/uploads/videos/${path.basename(file.filepath)}`;
      console.log('Video uploaded to:', videoUrl);
      res.status(200).json({ url: videoUrl });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
