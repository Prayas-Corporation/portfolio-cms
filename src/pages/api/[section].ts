import { NextApiRequest, NextApiResponse } from 'next';
import { handleApiRequest } from '@/lib/api-handler';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { section } = req.query;

  if (typeof section !== 'string') {
    res.status(400).json({ error: 'Invalid section parameter' });
    return;
  }

  return handleApiRequest(req, res, section);
}
