# Prevenglobal — App Android (primera etapa)

## Qué es esto, en palabras simples

Esta carpeta convierte tu plataforma Prevenglobal (la que ya usas en el
navegador, con backend en Railway) en una aplicación de Android instalable.
**No es una copia ni una versión aparte** — la app abre tu plataforma REAL
dentro de una ventana nativa de Android. Mismo login, misma base de datos,
mismos datos que ves en el computador, en tiempo real.

## Un aviso honesto antes de empezar

Yo (Claude) no tengo acceso al SDK de Android ni a las herramientas de
Google necesarias para compilar el archivo `.apk` directamente en mi
entorno de trabajo. Por eso te dejo **dos caminos** para obtenerlo, ambos
ya preparados:

1. **Automático, sin instalar nada (recomendado)** — usando GitHub Actions.
2. **Local, si ya tienes Android Studio instalado** — un solo comando.

---

## PASO 1 (obligatorio, antes de cualquiera de los dos caminos)

La URL de tu backend en Railway **ya está puesta** en `capacitor.config.ts`
(`https://prevenglobal-backend-production.up.railway.app`). Si en algún
momento cambia (por ejemplo, si conectas un dominio propio), solo edita
esa línea.

### Pendiente: el logo real de la empresa

Generé un ícono provisional (una "P" azul) para que la app no quede sin
ícono, pero **todavía no tengo tu logo real** — no lo tengo guardado como
archivo de imagen en ningún lado de este proyecto. Para ponerlo:

1. Envíame el logo (PNG, cuadrado, mínimo 512×512 píxeles) y yo te
   regenero los 5 tamaños necesarios, o
2. Reemplaza tú mismo los archivos `ic_launcher.png`,
   `ic_launcher_round.png` e `ic_launcher_foreground.png` dentro de cada
   carpeta `android/app/src/main/res/mipmap-*` (mdpi=48px, hdpi=72px,
   xhdpi=96px, xxhdpi=144px, xxxhdpi=192px).

---

## CAMINO A — Automático con GitHub Actions (recomendado, no necesitas instalar nada)

1. Crea un repositorio nuevo en GitHub (puede ser privado) y sube todo el
   contenido de esta carpeta ahí.
2. Ve a la pestaña **"Actions"** de tu repositorio en GitHub.
3. Verás el flujo **"Compilar APK de Prevenglobal"** — dale clic y luego
   **"Run workflow"**.
4. Espera unos 3-5 minutos. Cuando termine (ícono verde ✔), tienes DOS
   formas de bajar el `.apk`:
   - **Recomendada — pestaña "Releases"** (en la página principal del
     repositorio, columna derecha): ahí queda un enlace PERMANENTE tipo
     `Prevenglobal APK — compilación #7`, con el archivo `.apk` listo
     para descargar o compartir directo con los técnicos.
   - **Alternativa — dentro del run de Actions**: baja hasta
     "Artifacts" → `prevenglobal-apk` (este enlace caduca con el tiempo,
     usa el de Releases si vas a compartirlo).
5. Cada vez que vuelvas a correr el flujo, se crea un Release nuevo — no
   se sobrescribe el anterior, así que siempre puedes volver a una
   versión previa si hace falta.

## CAMINO B — Local, con Android Studio

Si ya tienes [Android Studio](https://developer.android.com/studio)
instalado en tu computador:

```bash
npm install
npx cap sync android
npx cap open android
```

Esto abre el proyecto en Android Studio. Desde ahí: menú **Build →
Build Bundle(s) / APK(s) → Build APK(s)**. El archivo queda en
`android/app/build/outputs/apk/debug/app-debug.apk`.

---

## Qué ya viene configurado

- **Permisos de Android** (`AndroidManifest.xml`): cámara, GPS de alta
  precisión, y acceso a archivos — los mismos que ya usan Órdenes de
  Servicio, la firma digital y Asistencia y Turnos. Android le pedirá
  estos permisos al usuario la primera vez que la app los necesite.
- **Nombre**: "Prevenglobal" — **ícono**: provisional por ahora, ver
  arriba cómo poner el logo real.
- **Todos los módulos pedidos** (Órdenes de Servicio con fotos/informe
  independientes por equipo y firma, Agregar Equipo, Inventario/Kardex,
  Cotización y Facturación con ítems esporádicos y conversión a factura,
  Asistencia y Turnos): no fue necesario construir nada aparte para
  estos — como la app abre la plataforma real, TODO lo que ya existe (y
  todo lo que construyamos juntos de aquí en adelante) aparece solo,
  sin volver a compilar el `.apk`.
- **Envío directo por WhatsApp**: instalé los plugins nativos
  `@capacitor/share` y `@capacitor/filesystem`. Dentro de la app, al
  enviar una Orden, Cotización o Factura por WhatsApp, ahora se usa el
  selector nativo de "Compartir" de Android (el mismo que usa cualquier
  app) — el documento llega adjunto directo, sin cortes ni pasos
  manuales. Fuera de la app (navegador de PC o celular), el
  comportamiento sigue exactamente igual que antes.
- **Sección "Configuración de la App"**: aparece en el menú lateral SOLO
  cuando la plataforma corre dentro del APK (no se ve en el navegador
  normal) — muestra usuario, rol, empresa, versión, y el botón de
  cerrar sesión.
- **Vista de campo y roles**: como siempre, el sistema de permisos que
  ya existe (técnico ve su vista limitada, administrador ve todo) sigue
  funcionando exactamente igual dentro de la app.

## Sobre la cámara y el GPS dentro de la app (punto a probar)

Capacitor maneja automáticamente el permiso de cámara y ubicación dentro
de su ventana nativa en la gran mayoría de los casos, sin que haya que
tocar código Java. Aun así, **es el punto que más vale la pena probar a
fondo primero** (creando una orden de servicio con foto, y marcando
Asistencia con GPS) porque el comportamiento de la cámara dentro de un
WebView puede variar un poco según la marca/versión de Android del
celular de prueba. Si en algún celular la cámara no pide permiso o no
abre, dímelo con el modelo y la versión de Android — ahí sí instalaríamos
el plugin nativo `@capacitor/camera` como respaldo (eso sería un ajuste
adicional, no algo que ya esté roto).

## Qué falta para la Google Play Store (no incluido en esta etapa)

Esta primera etapa genera un `.apk` de instalación directa ("debug"), que
es justo lo que pediste. Si más adelante quieres subir la app a Google
Play, hace falta: una versión firmada digitalmente ("release", con una
llave de firma propia), ícono adaptable completo, capturas de pantalla y
una cuenta de desarrollador de Google (pago único de USD 25). Aviso esto
para que no haya sorpresas, pero no es parte de lo que pediste ahora.
