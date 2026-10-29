// ---- codigo.steps.js ----
const { Then } = require('@cucumber/cucumber');
const assert = require('assert');
 
Then('el turno queda confirmado con el código {string}', function (codigo) {
  assert.strictEqual(this.resultado.ok, true);
  assert.strictEqual(this.resultado.turno.codigo, codigo);
});
