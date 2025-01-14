const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const logFilePath = path.join(__dirname, '..', 'api.log');

// Ruta para ver los registros de la consola
router.get('/', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer los registros.');
      return;
    }
    res.send(`
      <html>
        <head><title>Console Logs</title></head>
        <body>
          <h1>Registros de la consola</h1>
          <pre>${data}</pre>
          <p><a href="/">Volver al menú</a></p>
        </body>
      </html>
    `);
  });
});

module.exports = router;