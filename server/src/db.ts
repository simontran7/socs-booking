import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL!);
await client.connect();

const db = client.db('booking');
export default db;