import type { CapacitorConfig } from '@capacitor/cli';

/*
  La app abre la plataforma real (servidor propio, publicado por
  Cloudflare). Cualquier cambio subido al servidor se ve aquí de
  inmediato, sin recompilar el .apk. Solo hay que recompilar si cambia
  algo de este archivo o de la carpeta android/.
*/
const URL_PLATAFORMA = 'https://prevenglobal.com';

// Colores de marca (los mismos de android/app/src/main/res/values/colors.xml)
const AZUL_MARINO = '#1E3A5F';

const config: CapacitorConfig = {
  appId: 'com.prevenglobal.app',
  appName: 'Prevenglobal',
  webDir: 'www',
  // Fondo mientras la página carga (en vez de una pantalla blanca).
  backgroundColor: AZUL_MARINO,
  server: {
    url: URL_PLATAFORMA,
    cleartext: false,
    androidScheme: 'https',
    // Si no hay internet o el servidor no responde, se muestra esta
    // pantalla (está en www/) con un botón para reintentar.
    errorPath: 'sin-conexion.html'
  },
  android: {
    allowMixedContent: false
  },
  plugins: {
    // Pantalla de inicio con el logo mientras abre la plataforma.
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: AZUL_MARINO,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    },
    // Barra de arriba (hora, batería) con letras claras sobre el azul.
    SystemBars: {
      insetsHandling: 'css',
      style: 'DARK'
    }
  }
};

export default config;
