const { newsApi } = require('../api/newsapi');

const getTrends = async (req, res) => {
    const { page = 1 } = req.query
    const pageSize = 5;
    try {
        const response = await newsApi.get(`/top-headlines`, {
            params: {
                country: 'us',
                pageSize,
                page,
                apiKey: process.env.NEWS_API_KEY,
            }
        });

        return res.status(200).json({
            articles: response.data.articles,
            totalResults: response.data.totalResults,
            currentPage: Number(page),
            totalPages: Math.ceil(response.data.totalResults / pageSize)
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching trends' });
    }
};

module.exports = { getTrends };
