const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const turnos = require('../../src/turnos');

Given('que no hay turnos reservados', function () {
    turnos.reiniciar();
});

Given('que el horario {string} ya está reservado por {string}', function (hora, nombre) {
    turnos.reiniciar();
    turnos.reservar(nombre, hora);
});

When('{string} reserva el horario {string}', function (nombre, hora) {
    this.resultado = turnos.reservar(nombre, hora);
});

Then('el turno queda confirmado para las {string}', function (hora) {
    assert.strictEqual(this.resultado.ok, true);
    assert.strictEqual(this.resultado.turno.hora, hora);
});

Then('el sistema rechaza la reserva con el mensaje {string}', function (mensaje) {
    assert.strictEqual(this.resultado.ok, false);
    assert.strictEqual(this.resultado.error, mensaje);
});
