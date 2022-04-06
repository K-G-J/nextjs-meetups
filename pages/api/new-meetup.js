import { MongoClient } from 'mongodb';


// /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body
      
      const client = await MongoClient.connect('mongodb+srv://KateJohnson:mRyYzWEntwutOQqv@cluster0.zrrsl.mongodb.net/meetups?retryWrites=true&w=majority')
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);

      console.log(result)

      client.close()

      res.status(201).json({ message: 'meetup inserted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler;