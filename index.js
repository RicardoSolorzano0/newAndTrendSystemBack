const express = require("express")
const connectionBD = require("./bd/connection");
const dotenv = require("dotenv")
const cors = require("cors")

//rutas
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");

dotenv.config();

connectionBD();

const app = express();

//middlewares
app.use(express.json());
app.use(cors())

app.use("/users", userRoutes);
app.use("/news", newsRoutes);

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})