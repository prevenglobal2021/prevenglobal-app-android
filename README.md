# Logo de Prevenglobal

Esta carpeta guarda el logo oficial de la empresa, para tenerlo en un solo
lugar dentro del proyecto de la app (en vez de andar buscando archivos
sueltos cada vez que haga falta).

## Archivos

- **`logo-original.png`** — el logo completo tal como lo diseñaron,
  incluyendo el texto "Prevenglobal / Proyectos y montajes de refrigeración"
  debajo del emblema circular. Este es el que se usa como referencia
  general, o para documentos/impresos donde sí se quiere el texto.

- **`logo-emblema-recortado.png`** — solo el emblema circular (el oso con
  las manos), sin el texto de abajo. **Este es el que se usa para el
  ícono de la app y en los lugares donde el nombre "Prevenglobal" ya se
  muestra aparte como texto** (el menú lateral, el encabezado, los PDF) —
  poner el texto dos veces se ve repetido.

## Si el logo cambia en el futuro

1. Reemplaza `logo-original.png` por el nuevo archivo (mismo nombre).
2. Pide que se recorte el nuevo emblema (sin el texto de abajo) para
   generar `logo-emblema-recortado.png`.
3. A partir de ese recorte se regeneran los 5 tamaños de ícono de Android
   (`android/app/src/main/res/mipmap-*/ic_launcher.png`,
   `ic_launcher_round.png`, `ic_launcher_foreground.png`) y se sube ese
   emblema recortado a la plataforma web, en Configuración → Apariencia
   (ahí la plataforma ya lo ajusta de tamaño sola).
4. Después de actualizar los íconos de Android, hay que compilar un
   `.apk` nuevo (pestaña "Actions" → "Run workflow") para que el ícono se
   vea actualizado en el celular — un logo nuevo sí requiere esto, a
   diferencia de la mayoría de cambios de la plataforma, que se ven solos
   sin recompilar nada.
