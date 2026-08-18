# Coffee & Vending Panamá — propuesta de rediseño

Propuesta de rediseño de la portada de [coffeevending.com.pa](https://www.coffeevending.com.pa),
preparada por **NovahWeb** como pieza comercial.

👉 **https://novahweb.github.io/coffeevending-propuesta/**

## Qué NO es

**No es el sitio oficial de Coffee & Vending Panamá**, no está afiliado a la empresa y no recoge
datos: el formulario de cotización es una demostración que no envía nada. Las fotografías y los
datos de contacto salen de su sitio público y se muestran únicamente para ilustrar el diseño.

La página lleva `noindex, nofollow`: se comparte por enlace, nunca por buscador. Si se indexara,
competiría en búsquedas con el sitio real de la empresa y alguien podría llamarlos creyendo que
este es el oficial.

## Qué cambia respecto del sitio actual

El sitio actual **no es malo** — está en Astro, tiene sistema de tokens, paleta propia y
tipografía de marca con licencia. Lo que cambia acá:

| Medido | Actual | Esta propuesta |
|---|---|---|
| Alto de la portada (escritorio) | 16 717 px | ~4 800 px |
| Acentos de color compitiendo | 5 | 1 |
| Pantallas completas sin texto | 1 | 0 |
| Formas de empezar una cotización | 0 | 1 |
| Imágenes sin texto alternativo | 6 | 0 |
| Peso del logo | 82 KB (PNG 1921×1080) | 0 (tipográfico) |

El hallazgo comercial, más que de diseño: **el sitio actual no captura un solo dato.** Todos sus
llamados a la acción llevan a otra página o a abrir una conversación desde cero. Acá hay una
franja de tres campos —cuántos son, qué necesitan, dónde están— que es exactamente la
información con la que se arma una propuesta.

## De dónde salen las decisiones

Se investigaron los sitios de los líderes del sector en EE.UU. (365 Retail Markets, Crafty,
Cantaloupe, Canteen, Bevi, Five Star, Avanti, Aramark, CPI, Vistar). Hallazgo central:

> **En todo ese mercado no existe una página donde un jefe de operaciones ponga sus datos y vea
> un número.** Y no hay un solo premio de awwwards en la categoría: la vara está baja.

Lo que se tomó, con fuente:

| Movimiento | De |
|---|---|
| 2 campos → 3 números, sin muro, correo DESPUÉS | [365 Retail Markets](https://365retailmarkets.com/roi-calculator-upgrading-vending) — única calculadora real del rubro |
| Publicar la fórmula por persona/día | [Crafty](https://www.craftydelivers.com/insights/cost-per-employee-office-pantry-tiers) |
| Nombrar al enemigo en una tabla | [Bevi](https://bevi.co) — acá: la cafetera del piso |
| Hero corto sobre el LUGAR DE TRABAJO, no el café | [Canteen](https://www.canteen.com): «Create a better workplace.» |
| Retención como número estrella | Canteen (98%) — en servicio recurrente pesa más que el tamaño |
| Grilla de servicios con foto | [Five Star](https://www.fivestarbreaktime.com) |
| Grading unificado de fotografía | Five Star — lo más barato para que un sitio se vea caro |

Trampas evitadas, todas observadas en esos sitios: formulario que pide y no devuelve nada
(Canteen), catálogo tras login (Aramark), página de categoría sin un dato (365), hero que
describe a la empresa (Vistar), video como CTA principal (CPI).

🔴 **La calculadora estima consumo y costo con el tramo que elige el visitante, nunca una tarifa
de Coffee & Vending** — nadie nos dio una. El supuesto va impreso al lado del número.

## Cómo está hecho

HTML, CSS y 9 KB de JavaScript a mano. Sin dependencias, sin build.

```
index.html             20 KB
assets/estilo.css      24 KB
assets/archivo.woff2   87 KB
assets/*.webp         290 KB   ← 8 fotos suyas, graduadas igual (pesaban 1 095 KB)
assets/*.js             9 KB
```

## Publicar cambios

```sh
bash publicar.sh
```
