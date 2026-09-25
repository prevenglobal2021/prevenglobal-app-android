import type { CapacitorConfig } from '@capacitor/cli';

/*
  Backend real de producción — ahora en el servidor propio (ThinkCentre),
  la misma API que usa la plataforma en el navegador del computador.
  Cualquier cambio subido al servidor se refleja aquí de inmediato, sin
  recompilar el .apk (salvo cambios como este, de la URL misma).
*/
const URL_BACKEND_PRODUCCION = 'https://prevenglobal.com';

const config: CapacitorConfig = {
  appId: 'com.prevenglobal.app',
  appName: 'Prevenglobal',
  webDir: 'www',
  server: {
    url: URL_BACKEND_PRODUCCION,
    cleartext: false,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: false
  }
};

export default config;
