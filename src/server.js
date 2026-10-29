const http = require('http');
const fs = require('fs');
const path = require('path');
const turnos = require('./turnos');
 
const PUBLICO = path.join(__dirname, '..', 'public');
const PUERTO = process.env.PORT || 3000;
const ESTATICOS = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
};
 
function responderJson(res, estado, datos) {
  res.writeHead(estado, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(datos));
}
 
function leerCuerpo(req) {
  return new Promise((resolve) => {
    let texto = '';
    req.on('data', (parte) => (texto += parte));
    req.on('end', () => {
      try {
        resolve(JSON.parse(texto || '{}'));
      } catch {
        resolve({});
      }
    });
  });
}
 
const servidor = http.createServer(async (req, res) => {
  if (req.method === 'GET' && ESTATICOS[req.url]) {
    const [archivo, tipo] = ESTATICOS[req.url];
    res.writeHead(200, { 'Content-Type': tipo });
    return res.end(fs.readFileSync(path.join(PUBLICO, archivo)));
  }
  if (req.method === 'GET' && req.url === '/api/turnos') {
    return responderJson(res, 200, { turnos: turnos.listar(), libres: turnos.horariosLibres() });
  }
  if (req.method === 'POST' && req.url === '/api/turnos') {
    const { nombre, hora } = await leerCuerpo(req);
    const resultado = turnos.reservar(nombre, hora);
    return responderJson(res, resultado.ok ? 201 : 400, resultado);
  }
  responderJson(res, 404, { ok: false, error: 'No encontrado' });
});
 
servidor.listen(PUERTO, () => console.log(`Turnos en línea: http://localhost:${PUERTO}`));
