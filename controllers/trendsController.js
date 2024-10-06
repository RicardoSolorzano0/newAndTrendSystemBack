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
        if (error.status === 426) {
            return res.status(426).json({ message: "Ha solicitado demasiados resultados. Las cuentas de desarrollador están limitadas a un máximo de 100 resultados. Está intentando solicitar entre 150 y 155 resultados. Actualice a un plan pago si necesita más resultados." });
        }
        return res.status(500).json({ message: `Error al obtener tendencias ` });
    }
};

module.exports = { getTrends };
