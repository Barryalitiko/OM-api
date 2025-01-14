const express = require("express");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 3003;

// URL del video para descargar automáticamente cuando se solicite
const videoURL = "https://youtu.be/4X4uckVyk9o?feature=shared";
const outputPath = path.join(__dirname, "public", "video_prueba.mp4");

// Ruta para descargar el video a través de la API
app.get("/download-video", (req, res) => {
  console.log("Solicitud de descarga de video recibida.");

  // Descargar el video cada vez que la solicitud llegue
  const command = `yt-dlp -o "${outputPath}" ${videoURL}`;
  console.log("Ejecutando comando de descarga: ", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al descargar el video: ${error.message}`);
      return res.status(500).send("Error al descargar el video.");
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send("Error al descargar el video.");
    }

    console.log("Video descargado exitosamente.");
    const downloadLink = `http://localhost:${PORT}/public/video_prueba.mp4`; // Enlace de descarga directo
    console.log("Enlace de descarga directo generado: ", downloadLink);

    res.send(`
      <html>
        <head>
          <title>Descarga de Video</title>
        </head>
        <body>
          <h1>Video descargado exitosamente!</h1>
          <p><a href="${downloadLink}" style="font-size:20px;">Haz clic aquí para descargar el video</a></p>
        </body>
      </html>
    `);
  });
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});