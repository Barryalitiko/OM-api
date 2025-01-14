const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const publicDir = path.join(__dirname, '..', 'public');

// Ruta para ver los archivos en la carpeta 'public'
router.get('/', (req, res) => {
  fs.readdir(publicDir, (err, files) => {
    if (err) {
      res.status(500).send('Error al leer los archivos.');
      return;
    }
    const fileLinks = files.map(file => {
      return `<li><a href="/public/${file}" target="_blank">${file}</a></li>`;
    }).join('');
    res.send(`
      <html>
        <head><title>Archivos en Public</title></head>
        <body>
          <h1>Archivos disponibles en public:</h1>
          <ul>${fileLinks}</ul>
          <p><a href="/">Volver al menú</a></p>
        </body>
      </html>
    `);
  });
});

module.exports = router;