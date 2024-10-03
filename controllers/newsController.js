const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const getNews = async (req, res) => {
    const { topic, page = 1 } = req.query;
    const pageSize = 5;

    try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
            params: {
                q: topic,
                apiKey: process.env.NEWS_API_KEY,
                pageSize,
                page,
                language: "es",
            }
        })

        return res.status(200).json({
            articles: response.data.articles,
            totalResults: response.data.totalResults,
            currentPage: Number(page),
            totalPages: Math.ceil(response.data.totalResults / pageSize)
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener news" });
    }
}

module.exports = { getNews }