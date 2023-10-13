import axios from "axios";

export default async (req, res) => {
    try {
        const response = await axios.post("http://sakaarsen.lag.tf/api/ask", {
            question: req.body.question,
        }, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}