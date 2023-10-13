// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// api/proxy.js
import axios from 'axios';

export default async (req, res) => {
  try {
    const response = await axios.get('http://sakaarsen.lag.tf/api/news');
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
