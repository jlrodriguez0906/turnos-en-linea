const HORARIOS = ['09:00', '10:00', '11:00', '12:00'];
 
let turnos = [];
let siguienteId = 1;
 
function reiniciar() {
  turnos = [];
  siguienteId = 1;
}
 
function activos() {
  return turnos.filter((t) => t.estado === 'activo');
}
 
function listar() {
  return activos();
}
 
function horariosLibres() {
  return HORARIOS.filter((h) => !activos().some((t) => t.hora === h));
}
 
function reservar(nombre, hora) {
  if (!nombre || !nombre.trim()) {
    return { ok: false, error: 'El nombre es obligatorio' };
  }
  if (!HORARIOS.includes(hora)) {
    return { ok: false, error: 'Horario no válido' };
  }
  if (activos().some((t) => t.hora === hora)) {
    return { ok: false, error: 'El horario ya está reservado' };
  }

const turno = { id: siguienteId++, nombre: nombre.trim(), hora, estado: 'activo', codigo: 'T-' + hora.replace(':', '') };

  turnos.push(turno);
  return { ok: true, turno };
}
 
function cancelar(id) {
  const turno = activos().find((t) => t.id === id);
  if (!turno) {
    return { ok: false, error: 'El turno no existe o ya fue cancelado' };
  }
  turno.estado = 'cancelado';
  return { ok: true, turno };
}
 
module.exports = { HORARIOS, reiniciar, listar, horariosLibres, reservar, cancelar };