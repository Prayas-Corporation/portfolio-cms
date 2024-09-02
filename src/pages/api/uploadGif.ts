// /pages/api/uploadGif.ts
import { put } from '@vercel/blob';
import type { NextApiResponse, NextApiRequest, PageConfig } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const blob = await put(request.query.filename as string, request, {
      access: 'public',
      contentType: 'image/gif', // Adjust the content type if needed
    });

    return response.status(200).json(blob);
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    return response.status(500).json({ error: 'Error uploading file' });
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false, // Disable default body parser to handle file uploads
  },
};
