const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const turnos = require('../../src/turnos');

When('se cancela el turno de las {string}', function (hora) {
    const turno = turnos.listar().find((t) => t.hora === hora);
    this.resultado = turnos.cancelar(turno ? turno.id : 0);
});

Then('el horario {string} vuelve a estar disponible', function (hora) {
    assert.strictEqual(this.resultado.ok, true);
    assert.ok(turnos.horariosLibres().includes(hora));
});

Then('el sistema rechaza la cancelación con el mensaje {string}', function (mensaje) {
    assert.strictEqual(this.resultado.ok, false);
    assert.strictEqual(this.resultado.error, mensaje);
});
