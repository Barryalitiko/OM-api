const express = require('express');
const router = express.Router();

// Ruta para el menú principal
router.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Menu</title></head>
      <body>
        <img src="/menu-image.jpg" alt="Menu Image" style="width:100%; height:auto;">
        <h1>Krampus OM API Menu</h1>
        <p><a href="/file-list">Ver archivos en public</a></p>
        <p><a href="/console-log">Ver registros de la consola</a></p>
      </body>
    </html>
  `);
});

module.exports = router;