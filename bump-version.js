/* =========================================================
   bump-version.js — sube automáticamente el número de versión de la
   app (Android) antes de cada nueva construcción del .apk.

   Uso: desde la carpeta raíz del proyecto (donde está la carpeta
   "android"), corre:
       node bump-version.js
   y luego sigue normal con "npx cap sync android" y Android Studio.

   Qué hace:
   - Sube el "versionCode" en 1 (el contador interno que Android exige
     que SIEMPRE aumente — nunca puede bajar ni repetirse, o el
     celular rechaza la actualización).
   - Sube el último número del "versionName" (el que ve la persona,
     ej. 1.0.1 -> 1.0.2). Si llega a 1.0.9, el siguiente paso es 1.0.10
     (no vuelve a 1.0.0).
   - Deja todo escrito directo en android/app/build.gradle — no hace
     falta tocar nada a mano.
========================================================= */
const fs = require('fs');
const path = require('path');

const rutaGradle = path.join(__dirname, 'android', 'app', 'build.gradle');

if (!fs.existsSync(rutaGradle)) {
  console.error('❌ No encontré el archivo en: ' + rutaGradle);
  console.error('   Corre este script desde la carpeta raíz del proyecto (la que contiene la carpeta "android").');
  process.exit(1);
}

let contenido = fs.readFileSync(rutaGradle, 'utf8');

const coincideCode = contenido.match(/versionCode\s+(\d+)/);
const coincideName = contenido.match(/versionName\s+"([\d.]+)"/);

if (!coincideCode || !coincideName) {
  console.error('❌ No pude encontrar "versionCode" o "versionName" en ese archivo. Revisa que no se haya modificado el formato.');
  process.exit(1);
}

const versionCodeActual = parseInt(coincideCode[1], 10);
const versionNameActual = coincideName[1];

const versionCodeNuevo = versionCodeActual + 1;

// Sube el último número (el "patch") del versionName: 1.0.1 -> 1.0.2
const partes = versionNameActual.split('.').map(n => parseInt(n, 10));
partes[partes.length - 1] += 1;
const versionNameNuevo = partes.join('.');

contenido = contenido.replace(/versionCode\s+\d+/, `versionCode ${versionCodeNuevo}`);
contenido = contenido.replace(/versionName\s+"[\d.]+"/, `versionName "${versionNameNuevo}"`);

fs.writeFileSync(rutaGradle, contenido, 'utf8');

console.log('✅ Versión actualizada correctamente:');
console.log(`   versionCode:  ${versionCodeActual}  ->  ${versionCodeNuevo}`);
console.log(`   versionName:  ${versionNameActual}  ->  ${versionNameNuevo}`);
console.log('\nAhora sigue con: npx cap sync android, y luego genera el .apk en Android Studio.');
