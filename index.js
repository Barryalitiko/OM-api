const express = require("express");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 3003;

// URL del video para descargar automáticamente al iniciar la API
const videoURL = "https://youtu.be/4X4uckVyk9o?feature=shared";
const outputPath = path.join(__dirname, "public", "video_prueba.mp4");

// Comando de yt-dlp para descargar el video
const command = `yt-dlp -o "${outputPath}" ${videoURL}`;

// Ruta principal con el menú
app.get("/", (req, res) => {
  const downloadLink = `<a href="/download-video" style="font-size:20px;">Descargar Video</a>`;
  res.send(`
    <html>
      <head>
        <title>API Operacion Marshall</title>
      </head>
      <body>
        <h1>Bienvenido a la API Operacion Marshall</h1>
        <p>Seleccione una opción:</p>
        <a href="/public-files" style="font-size:20px;">Ver archivos en 'public'</a><br/><br/>
        ${downloadLink}
      </body>
    </html>
  `);
});

// Ruta para ver la lista de archivos en la carpeta public
app.get("/public-files", (req, res) => {
  const publicDir = path.join(__dirname, "public");

  fs.readdir(publicDir, (err, files) => {
    if (err) {
      logger.error("Error al leer la carpeta public:", err.message);
      return res.status(500).send("No se pudieron leer los archivos.");
    }

    // Generamos un listado HTML con los archivos y un botón para volver al menú principal
    const fileList = files
      .map(
        (file) =>
          `<li><a href="/public/${file}" target="_blank">${file}</a></li>`
      )
      .join("");

    res.send(`
      <html>
        <head>
          <title>Archivos en Public</title>
        </head>
        <body>
          <h1>Archivos en la carpeta 'public':</h1>
          <ul>${fileList}</ul>
          <br />
          <a href="/" style="font-size:20px;">Volver al menú principal</a>
        </body>
      </html>
    `);
  });
});

// Ruta para la descarga del video a través de la API
app.get("/download-video", (req, res) => {
  // Descargar el video siempre, incluso si ya existe
  exec(command, (error, stdout, stderr) => {
    if (error) {
      logger.error(`Error al descargar el video: ${error.message}`);
      return res.status(500).send("Error al descargar el video.");
    }
    if (stderr) {
      logger.error(`stderr: ${stderr}`);
      return res.status(500).send("Error al descargar el video.");
    }

    logger.info(`Video descargado exitosamente: ${stdout}`);
    res.download(outputPath, 'video_prueba.mp4', (err) => {
      if (err) {
        logger.error("Error al descargar el video:", err.message);
        return res.status(500).send("Error al descargar el video.");
      }
    });
  });
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Iniciar la descarga del video cuando se inicie la API
exec(command, (error, stdout, stderr) => {
  if (error) {
    logger.error(`Error al descargar el video: ${error.message}`);
    return;
  }
  if (stderr) {
    logger.error(`stderr: ${stderr}`);
    return;
  }
  logger.info(`Video descargado exitosamente: ${stdout}`);
});

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});