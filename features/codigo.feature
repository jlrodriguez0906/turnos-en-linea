# language: es
@HU-3
Característica: Código de confirmación
  Como ciudadano
  Quiero recibir un código al reservar
  Para presentarlo cuando me atiendan
 
  Escenario: El turno confirmado incluye un código
    Dado que no hay turnos reservados
    Cuando "Ana" reserva el horario "09:00"
    Entonces el turno queda confirmado con el código "T-0900"
