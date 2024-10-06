const { newsApi } = require("../api/newsapi");

const getNews = async (req, res) => {
    const { topic, page = 1, language = "es" } = req.query;
    const pageSize = 8;

    try {
        const response = await newsApi.get(`/everything`, {
            params: {
                q: topic,
                apiKey: process.env.NEWS_API_KEY,
                pageSize,
                page,
                language: language,
            }
        })

        return res.status(200).json({
            articles: response.data.articles,
            totalResults: response.data.totalResults,
            currentPage: Number(page),
            totalPages: Math.ceil(response.data.totalResults / pageSize)
        });
    } catch (error) {
        if (error.status === 426) {
            return res.status(426).json({ message: "Ha solicitado demasiados resultados. Las cuentas de desarrollador están limitadas a un máximo de 100 resultados. Está intentando solicitar entre 240 y 248 resultados. Actualice a un plan pago si necesita más resultados." });
        }
        return res.status(500).json({ message: `Error al obtener noticias sobre ${topic}` });
    }
}

module.exports = { getNews }