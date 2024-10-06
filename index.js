const express = require("express")
const connectionBD = require("./bd/connection");
const dotenv = require("dotenv")
const cors = require("cors")

//rutas
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const trendsRoutes = require("./routes/trendsRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const historyRoutes = require("./routes/historyRoutes");

dotenv.config();

connectionBD();

const app = express();

//middlewares
app.use(express.json());
app.use(cors())

//ruta inicial
app.get("/", (req, res) => {
    res.send("Hola mundo");
})

app.use("/users", userRoutes);
app.use("/news", newsRoutes);
app.use("/trends", trendsRoutes);
app.use("/analyze", analyzeRoutes);
app.use("/history", historyRoutes)

// ruta por si no encuentra el recurso
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})