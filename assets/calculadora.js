/*
 * La calculadora.
 *
 * Mecánica de 365 Retail Markets: dos campos, tres resultados, sin muro, y el correo se pide
 * DESPUÉS del número. Base de cálculo con los tramos por persona/día que Crafty publica abierto.
 *
 * 🔴 El tramo lo elige el VISITANTE. Coffee & Vending nunca nos dio una tarifa, así que ningún
 * número de esta página es una tarifa suya: es la aritmética de la decisión del visitante, con
 * el supuesto impreso al lado. Un estimado sin su supuesto a la vista es una promesa disfrazada.
 */
(() => {
  'use strict';

  const gente  = document.getElementById('c-gente');
  const rango  = document.getElementById('c-gente-r');
  const nivel  = document.getElementById('c-nivel');
  if (!gente || !nivel) return;

  const out = (k) => document.querySelector(`[data-out="${k}"]`);
  const usd = (n) => 'US$' + n.toLocaleString('es-PA', { maximumFractionDigits: 0 });

  // Consumos diarios por persona en cada nivel. Sirven para dimensionar equipos, no para cobrar.
  const CONSUMOS = { '1.75': 1.6, '3.25': 2.4, '5.50': 4.2, '8.00': 5.5 };
  const RAMA = {
    '1.75': ['Café', 'una o dos máquinas de grano a taza según los pisos'],
    '3.25': ['Café y snacks', 'grano a taza más una máquina de snacks bien surtida'],
    '5.50': ['Los cuatro servicios', 'café, snacks, bebidas frías y agua purificada'],
    '8.00': ['MicroMarket', 'una tienda abierta con autopago, más el café aparte'],
  };

  const DIAS_MES = 22;

  function calcular() {
    const n = Math.max(5, Math.min(2000, parseInt(gente.value, 10) || 60));
    const porDia = parseFloat(nivel.value);
    const consumos = Math.round(n * CONSUMOS[nivel.value]);
    const mes = Math.round((n * porDia * DIAS_MES) / 10) * 10;

    out('dia').textContent    = '≈ ' + consumos.toLocaleString('es-PA');
    out('persona').textContent = 'US$' + porDia.toFixed(2);
    out('mes').textContent    = '≈ ' + usd(mes);

    out('supuesto').textContent =
      `Sobre ${n} colaboradores, ${DIAS_MES} días laborables al mes y un nivel de US$${porDia.toFixed(2)} `
      + `por persona al día. Ese rango por persona es el estándar publicado de la industria, no una `
      + `tarifa de Coffee & Vending: tu propuesta se arma con tu caso, tus pisos y tus horarios.`;

    const [servicio, detalle] = RAMA[nivel.value];
    out('rama').innerHTML =
      `Para ${n} personas, eso es <strong>${servicio}</strong>: ${detalle}. `
      + `<a href="#servicios">Ver cómo funciona ese servicio →</a>`;
  }

  // Los dos controles del mismo dato se siguen entre sí. Sin esto, mover el deslizador y después
  // escribir en la casilla deja los dos mostrando números distintos, y el visitante deja de
  // creerle al resultado.
  const sincronizar = (desde, hacia) => {
    hacia.value = desde.value;
    calcular();
  };
  gente.addEventListener('input', () => { if (rango && +gente.value <= +rango.max) rango.value = gente.value; calcular(); });
  if (rango) rango.addEventListener('input', () => sincronizar(rango, gente));
  nivel.addEventListener('change', calcular);

  calcular();
})();
