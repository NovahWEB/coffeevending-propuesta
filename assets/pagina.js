/*
 * Lo poco que la página necesita que piense. Sin librerías: 3 KB.
 *
 * Dos cosas, y las dos son argumento de venta, no adorno:
 *   1. Los cinco momentos del día — por qué hacen falta cinco servicios y no uno.
 *   2. La cotización que responde mientras eliges — lo que el sitio actual no hace.
 */
(() => {
  'use strict';

  // ── Los momentos del día ──────────────────────────────────────────────────
  const MOMENTOS = [
    { s: 'El primer café decide el tono de la mañana.',
      t: 'Entre las 7:30 y las 9 se concentra el pico más alto del día. Si la máquina está vacía o dañada justo a esa hora, la gente sale — y ese es el hábito que después cuesta revertir.' },
    { s: 'A media mañana ya no es café: es algo de comer.',
      t: 'El bajón de las 10:30 se atiende con snacks, no con más cafeína. Es la hora en que una máquina bien surtida evita la salida de veinte minutos a la tienda de la esquina.' },
    { s: 'Al almuerzo, lo que importa es el agua.',
      t: 'El consumo de café cae y sube el de agua y bebidas frías. Un dispensador que se quedó sin filtro se nota justo acá.' },
    { s: 'Las tres de la tarde son la hora de la verdad.',
      t: 'El segundo pico del día, y el más caro de desatender: es cuando quedan tres horas de trabajo y la energía ya no alcanza. Café y snacks al mismo tiempo.' },
    { s: 'Al cierre, el consumo baja pero no se apaga.',
      t: 'Los que se quedan tarde son los que más notan si algo falta. Un MicroMarket abierto 24/7 cubre esa cola que ninguna máquina atendida cubre.' },
  ];

  const botones  = [...document.querySelectorAll('.momento-b')];
  const puntos   = [...document.querySelectorAll('.punto')];
  const cajaS    = document.querySelector('.momento-d__s');
  const cajaT    = document.querySelector('.momento-d__t');

  function mostrar(i) {
    const m = MOMENTOS[i];
    if (!m || !cajaS) return;
    cajaS.textContent = m.s;
    cajaT.textContent = m.t;
    botones.forEach((b, k) => {
      const activo = k === i;
      b.classList.toggle('is-activo', activo);
      b.setAttribute('aria-selected', String(activo));
    });
    puntos.forEach((p, k) => p.classList.toggle('is-activo', k === i));
  }

  botones.forEach((b, i) => {
    b.addEventListener('click', () => mostrar(i));
    // Flechas entre pestañas: es lo que un lector de pantalla espera de un role="tablist",
    // y sin esto los botones se recorren de a uno con el tabulador, que es peor.
    b.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      const n = (i + d + botones.length) % botones.length;
      botones[n].focus();
      mostrar(n);
    });
  });
  puntos.forEach((p, i) => p.addEventListener('click', () => {
    mostrar(i);
    botones[i]?.focus();
  }));
  mostrar(0);

  // La curva se dibuja al entrar en pantalla, una sola vez.
  const dia = document.querySelector('.dia');
  if (dia && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((filas) => {
      for (const f of filas) if (f.isIntersecting) { dia.classList.add('is-visible'); obs.disconnect(); }
    }, { threshold: 0.25 });
    obs.observe(dia);
  } else if (dia) {
    dia.classList.add('is-visible');   // sin soporte, se muestra dibujada y ya
  }

  // ── La cotización que responde ────────────────────────────────────────────
  /*
   * 🔴 Se estima CONSUMO, jamás precio. El precio es de Coffee & Vending y no lo sabemos;
   * publicar uno inventado sería la peor forma posible de perder una cuenta.
   *
   * El supuesto va impreso al lado del número. Un estimado sin su supuesto a la vista es
   * indistinguible de una promesa.
   */
  const RANGOS = { 'Menos de 25': 18, '25 a 75': 50, '75 a 200': 135, 'Más de 200': 260 };
  const POR_PERSONA = {
    'Café':              { f: 1.6, u: 'tazas de café al día' },
    'Snacks y bebidas':  { f: 0.5, u: 'consumos de snack al día' },
    'Soda':              { f: 0.4, u: 'bebidas frías al día' },
    'Agua purificada':   { f: 2.2, u: 'vasos de agua al día' },
    'MicroMarket':       { f: 0.8, u: 'compras en el MicroMarket al día' },
    'Todo':              { f: 5.5, u: 'consumos al día entre los cinco servicios' },
  };

  const gente = document.getElementById('gente');
  const que   = document.getElementById('que');
  const caja  = document.querySelector('.estimado');
  if (gente && que && caja) {
    const nEl = caja.querySelector('.estimado__n');
    const qEl = caja.querySelector('.estimado__q');
    const sEl = caja.querySelector('.estimado__sup');

    const recalcular = () => {
      const personas = RANGOS[gente.value] ?? 50;
      const modo = POR_PERSONA[que.value] ?? POR_PERSONA['Todo'];
      // Se redondea a la decena: un «203,5» finge una precisión que este cálculo no tiene.
      const total = Math.round((personas * modo.f) / 10) * 10;
      nEl.textContent = '≈ ' + total.toLocaleString('es-PA');
      qEl.textContent = modo.u;
      sEl.textContent = `Estimado grueso sobre ${personas} personas y ${modo.f} ${modo.u.split(' al día')[0]} por persona. `
        + 'Sirve para dimensionar los equipos, no como cotización: el precio se arma con tu caso.';
    };
    gente.addEventListener('change', recalcular);
    que.addEventListener('change', recalcular);
    recalcular();
  }
})();
