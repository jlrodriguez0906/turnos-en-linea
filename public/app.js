const formulario = document.getElementById('formulario');
const selector = document.getElementById('hora');
const mensaje = document.getElementById('mensaje');
const lista = document.getElementById('lista');

async function cargar() {
  const respuesta = await fetch('/api/turnos');
  const { turnos, libres } = await respuesta.json();
  selector.replaceChildren(...libres.map((h) => new Option(h))); 4

  lista.replaceChildren(
    ...turnos.map((t) => {
      const item = document.createElement('li');
      item.textContent = `${t.hora} · ${t.nombre} `;
      const boton = document.createElement('button');
      boton.textContent = 'Cancelar';
      boton.addEventListener('click', async () => {
        await fetch(`/api/turnos/${t.id}`, { method: 'DELETE' });
        cargar();
      });
      item.appendChild(boton);
      return item;
    })
  );


}

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const respuesta = await fetch('/api/turnos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: document.getElementById('nombre').value, hora: selector.value }),
  });
  const datos = await respuesta.json();
  mensaje.textContent = datos.ok ? `Turno confirmado para las ${datos.turno.hora}` : datos.error;
  cargar();
});

cargar();
