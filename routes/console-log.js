// routes/console-log.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Asumiendo que los registros se guardan en un archivo de texto
const logFilePath = path.join(__dirname, '../logs/api.log');

router.get("/", (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer los registros.");
    }

    res.send(`
      <html>
        <head><title>Registros de la Consola</title></head>
        <body>
          <h1>Registros de la API</h1>
          <pre>${data}</pre>
          <a href="/">Volver al menú</a>
        </body>
      </html>
    `);
  });
});

module.exports = router;