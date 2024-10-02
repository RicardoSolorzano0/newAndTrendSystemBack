const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config();

const URI = process.env.URI;

const connectionBD = () => mongoose.connect(URI).then(response => {
    console.log("BD conectada")
}).catch(error => {
    console.log("Error en la base de datos", error)
})

module.exports = connectionBD