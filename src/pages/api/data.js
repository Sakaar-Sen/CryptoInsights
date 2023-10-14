import axios from 'axios';

export default async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/analytics');
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
