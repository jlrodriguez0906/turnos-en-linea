# language: es
@HU-1
Característica: Reservar un turno
  Como ciudadano
  Quiero reservar un horario disponible
  Para ser atendido sin hacer fila
 
  Escenario: Reserva exitosa de un horario libre
    Dado que no hay turnos reservados
    Cuando "Ana" reserva el horario "09:00"
    Entonces el turno queda confirmado para las "09:00"
 
  Escenario: Rechazo de un horario ya reservado
    Dado que el horario "09:00" ya está reservado por "Ana"
    Cuando "Luis" reserva el horario "09:00"
    Entonces el sistema rechaza la reserva con el mensaje "El horario ya está reservado"
 
  Escenario: El nombre es obligatorio
    Dado que no hay turnos reservados
    Cuando "" reserva el horario "10:00"
    Entonces el sistema rechaza la reserva con el mensaje "El nombre es obligatorio"
