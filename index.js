const express = require("express");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const logger = require("./utils/logger"); // Importar el logger

const app = express();
const PORT = process.env.PORT || 6666;

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

// Verificar si el archivo ya existe antes de intentar descargarlo
fs.exists(outputPath, (exists) => {
  if (!exists) {
    // Ejecutar la descarga del video cuando se encienda la API
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Error al descargar el video: ${error.message}`); // Usar logger para errores
        return;
      }
      if (stderr) {
        logger.error(`stderr: ${stderr}`); // Usar logger para stderr
        return;
      }
      logger.info(`Video descargado exitosamente: ${stdout}`);
    });
  } else {
    logger.info("El video ya está descargado, no es necesario volver a descargarlo.");
  }
});

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});