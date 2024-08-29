// src/lib/api-handler.ts

import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export async function handleApiRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  collectionName: string
) {
  const client = await clientPromise;
  const db = client.db('razzKazashi'); // Replace with your MongoDB database name
  const collection = db.collection(collectionName);

  switch (req.method) {
    case 'GET':
      await handleGetRequest(collection, res);
      break;
    case 'PUT':
      await handlePutRequest(req, collection, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetRequest(collection:any, res: NextApiResponse) {
  try {
    const data = await collection.findOne({});
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

async function handlePutRequest(req: NextApiRequest, collection:any, res: NextApiResponse) {
  try {
    const updatedData = req.body;
    const result = await collection.updateOne({}, { $set: updatedData }, { upsert: true });
    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      res.status(400).json({ error: 'Failed to update data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' });
  }
}
