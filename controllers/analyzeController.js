const SentimentAnalysis = require('../models/SentimentAnalysis');
const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;

const analyzeSentiment = async (req, res) => {
    const { topic, headlines, user } = req.body; // Se espera que el cuerpo tenga el tema y los titulares

    try {
        const analyzer = new Analyzer("Spanish", stemmer, "afinn");
        const results = analyzer.getSentiment(headlines.split(" "))

        const finalResult = results > 0 ? 'positivo' : results < 0 ? 'negativo' : 'neutral';

        const analysis = await SentimentAnalysis.create({
            user,
            topic,
            results: finalResult,
            headlines,
            date: new Date(),
            sentiment: results.toFixed(2),
        });

        return res.status(200).json(analysis);
    } catch (error) {
        return res.status(500).json({ message: "Error al realizar el análisis de sentimiento" });
    }
}

module.exports = { analyzeSentiment };
