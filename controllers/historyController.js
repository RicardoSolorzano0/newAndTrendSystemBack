const SentimentAnalysis = require("../models/SentimentAnalysis");
const User = require("../models/User");
const { ObjectId } = require('mongodb');

const getHistory = async (req, res) => {
    try {
        const { id, page } = req.query;

        //identificando si el usuario es administrador o es usuario
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const pageSize = await SentimentAnalysis.estimatedDocumentCount();
        const currentPage = page;

        //verificando rol
        if (user.rol === "admin") {
            //obteniendo historial
            const history = await SentimentAnalysis.aggregate([

                {
                    $project: {
                        _id: 0,
                        id: "$_id",
                        userId: "$user",
                        text: "$headlines",
                        sentiment: {
                            $switch: {
                                branches: [
                                    {
                                        case: {
                                            $gt: ["$sentiment", 0]
                                        },
                                        then: "Positivo"
                                    },
                                    {
                                        case: {
                                            $eq: ["$sentiment", 0]
                                        },
                                        then: "Neutral"
                                    },
                                    {
                                        case: {
                                            $lt: ["$sentiment", 0]
                                        },
                                        then: "Negativo"
                                    }
                                ],
                                default: "Indeterminado"
                            }
                        },
                        keywords: {
                            $split: ["$headlines", " "]
                        },
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%dT%H:%M:%SZ",
                                date: "$date"
                            }
                        }
                    }
                },
                {
                    $skip: (pageSize * (currentPage - 1))
                },
                {
                    $limit: pageSize
                }
            ]);

            return res.status(200).json({ history });
        }

        //obteniendo historial de un usuario
        const history = await SentimentAnalysis.aggregate([
            {
                $match: {
                    user: {
                        $eq: new ObjectId(id)
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    userId: "$user",
                    text: "$headlines",
                    sentiment: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $gt: ["$sentiment", 0]
                                    },
                                    then: "Positivo"
                                },
                                {
                                    case: {
                                        $eq: ["$sentiment", 0]
                                    },
                                    then: "Neutral"
                                },
                                {
                                    case: {
                                        $lt: ["$sentiment", 0]
                                    },
                                    then: "Negativo"
                                }
                            ],
                            default: "Indeterminado"
                        }
                    },
                    keywords: {
                        $split: ["$headlines", " "]
                    },
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%dT%H:%M:%SZ",
                            date: "$date"
                        }
                    }
                }
            },
            {
                $skip: (pageSize * (currentPage - 1))
            },
            {
                $limit: pageSize
            }
        ]);

        return res.status(200).json({ history });

    } catch (error) {
        return res.status(500).json({ message: "Error al obtener historial" });
    }
}

module.exports = { getHistory };