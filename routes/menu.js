// routes/menu.js
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Menú</title></head>
      <body>
        <h1>Bienvenido a la API Krampus OM</h1>
        <img src="/path/to/your/image.jpg" alt="Menu Image" />
        <ul>
          <li><a href="/file-list">Ver archivos descargados</a></li>
          <li><a href="/console-log">Ver registros de la consola</a></li>
        </ul>
      </body>
    </html>
  `);
});

module.exports = router;