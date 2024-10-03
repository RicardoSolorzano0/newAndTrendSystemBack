const express = require("express")
const connectionBD = require("./bd/connection");
const dotenv = require("dotenv")
const cors = require("cors")

//rutas
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const trendsRoutes = require("./routes/trendsRoutes");

dotenv.config();

connectionBD();

const app = express();

//middlewares
app.use(express.json());
app.use(cors())

app.use("/users", userRoutes);
app.use("/news", newsRoutes);
app.use("/trends", trendsRoutes);

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})