const express = require("express");
const path = require("path");
const fs = require("fs");
const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 6666; // Puerto actualizado a 6666

// URL del video para descargar automáticamente al iniciar la API
const videoURL = "https://youtu.be/4X4uckVyk9o?feature=shared";
const outputPath = path.join(__dirname, "public", "video_prueba.mp4");

// Comando de yt-dlp para descargar el video
const command = `yt-dlp -o "${outputPath}" ${videoURL}`;

app.get("/", (req, res) => {
  logger.info("API Operacion Marshall");
  res.json({ message: "Krampus OM API" });
});

// Ruta para ver el video descargado
app.get("/public/video_prueba.mp4", (req, res) => {
  res.sendFile(outputPath);
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ejecutar la descarga del video cuando se encienda la API
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al descargar el video: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Video descargado exitosamente: ${stdout}`);
});

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});