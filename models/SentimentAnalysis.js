const mongoose = require("mongoose");

const sentimentAnalysisSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    results: { type: String, required: true },
    headlines: { type: String, required: true },
    date: { type: Date, default: Date.now },
    sentiment: { type: Number, required: true },
});

const SentimentAnalysis = mongoose.model("SentimentAnalysis", sentimentAnalysisSchema);
module.exports = SentimentAnalysis;
