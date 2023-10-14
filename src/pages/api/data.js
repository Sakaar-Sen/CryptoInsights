import axios from 'axios';

export default async (req, res) => {
  try {
    const response = await axios.get('http://sakaarsen.lag.tf/api/analytics');
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
