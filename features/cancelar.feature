# language: es
@HU-2
Característica: Cancelar un turno
  Como ciudadano
  Quiero cancelar un turno reservado
  Para liberar el horario para otra persona
 
  Escenario: Cancelar un turno reservado
    Dado que el horario "09:00" ya está reservado por "Ana"
    Cuando se cancela el turno de las "09:00"
    Entonces el horario "09:00" vuelve a estar disponible
 
  Escenario: Cancelar un turno que no existe
    Dado que no hay turnos reservados
    Cuando se cancela el turno de las "10:00"
    Entonces el sistema rechaza la cancelación con el mensaje "El turno no existe o ya fue cancelado"
