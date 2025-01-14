// routes/file-list.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get("/", (req, res) => {
  const publicDir = path.join(__dirname, '../public');
  fs.readdir(publicDir, (err, files) => {
    if (err) {
      return res.status(500).send("Error al leer los archivos.");
    }

    const fileList = files.map(file => {
      return `<li><a href="/public/${file}" target="_blank">${file}</a></li>`;
    }).join('');

    res.send(`
      <html>
        <head><title>Lista de Archivos</title></head>
        <body>
          <h1>Archivos en la carpeta 'public'</h1>
          <ul>
            ${fileList}
          </ul>
          <a href="/">Volver al menú</a>
        </body>
      </html>
    `);
  });
});

module.exports = router;