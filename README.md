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

## Cómo está hecho

HTML y CSS a mano, sin dependencias ni build. **204 KB en total**, una sola tipografía
(Archivo Variable, con eje de ancho: comprimida hace de display y en ancho normal hace de cuerpo).

```
index.html            14 KB
assets/estilo.css     18 KB
assets/archivo.woff2  87 KB
assets/*.webp         81 KB   ← las mismas 3 fotos que su sitio sirve en 419 KB
```

## Publicar cambios

```sh
bash publicar.sh
```
