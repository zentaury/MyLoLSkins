# 📊 Google Analytics 4 - Guía de Configuración

Esta guía te ayudará a configurar Google Analytics 4 (GA4) en tu aplicación My LoL Skins para medir el tráfico y comportamiento de los usuarios.

---

## 🎯 ¿Por qué Google Analytics 4?

- ✅ **Gratuito** - Sin costo alguno
- ✅ **Completo** - Métricas detalladas de usuarios, páginas, eventos
- ✅ **En tiempo real** - Ve el tráfico en vivo
- ✅ **Informes personalizados** - Crea reportes según tus necesidades
- ✅ **Integración con Google** - Conecta con Search Console, Ads, etc.

---

## 📝 Paso 1: Crear una Cuenta de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Click en **"Empezar a medir"** o **"Admin"** (ícono de engranaje)

---

## 🏢 Paso 2: Crear una Propiedad

1. En la sección **Admin**, click en **"Crear propiedad"**
2. Completa los datos:
   - **Nombre de la propiedad**: `My LoL Skins`
   - **Zona horaria**: Selecciona tu zona horaria
   - **Moneda**: Selecciona tu moneda
3. Click en **"Siguiente"**

---

## 🌐 Paso 3: Configurar el Flujo de Datos Web

1. Selecciona **"Web"** como plataforma
2. Completa los datos:
   - **URL del sitio web**: `https://mylolskins.com`
   - **Nombre del flujo**: `My LoL Skins - Web`
3. Click en **"Crear flujo"**

---

## 🔑 Paso 4: Obtener tu Measurement ID

Después de crear el flujo, verás tu **ID de medición** (Measurement ID):

```
G-XXXXXXXXXX
```

**¡Este es el ID que necesitas!**

---

## ⚙️ Paso 5: Configurar en tu Aplicación

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza la línea:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=
   ```
   
   Con tu Measurement ID:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Guarda el archivo**

---

## 🚀 Paso 6: Reiniciar el Servidor de Desarrollo

Para que los cambios en `.env` surtan efecto:

```bash
# Detén el servidor (Ctrl + C)
# Luego reinicia:
npm run dev
```

---

## ✅ Paso 7: Verificar que Funciona

### Opción 1: En Tiempo Real

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad **"My LoL Skins"**
3. En el menú izquierdo, click en **"Informes" → "Tiempo real"**
4. Abre tu aplicación en el navegador: `http://localhost:3000`
5. Deberías ver **1 usuario activo** en el panel de tiempo real

### Opción 2: Consola del Navegador

1. Abre tu aplicación: `http://localhost:3000`
2. Abre las DevTools (F12)
3. Ve a la pestaña **"Network"**
4. Busca peticiones a `google-analytics.com` o `gtag`
5. Si ves peticiones, ¡está funcionando!

---

## 📊 Métricas que Podrás Ver

Una vez configurado, Google Analytics te mostrará:

### 📈 Tráfico
- **Usuarios activos** - Cuántas personas están usando tu app ahora
- **Usuarios totales** - Cuántas personas han visitado tu app
- **Nuevos usuarios** - Cuántos usuarios son nuevos vs. recurrentes
- **Sesiones** - Cuántas veces se ha usado tu app

### 🌍 Audiencia
- **Ubicación geográfica** - De qué países/ciudades son tus usuarios
- **Dispositivos** - Desktop, móvil, tablet
- **Navegadores** - Chrome, Firefox, Safari, etc.
- **Sistema operativo** - Windows, Mac, Linux, Android, iOS

### 📄 Comportamiento
- **Páginas más visitadas** - Qué páginas son más populares
- **Tiempo en página** - Cuánto tiempo pasan en cada página
- **Tasa de rebote** - Cuántos usuarios se van sin interactuar
- **Flujo de usuarios** - Cómo navegan por tu app

### 🎯 Eventos (Automáticos)
- **page_view** - Cada vez que se carga una página
- **scroll** - Cuando los usuarios hacen scroll
- **click** - Clicks en enlaces externos
- **file_download** - Descargas de archivos

---

## 🔧 Eventos Personalizados (Opcional)

Si quieres rastrear eventos específicos (como "Skin agregada", "Colección exportada"), puedes agregar código como este:

```typescript
// Ejemplo: Rastrear cuando un usuario agrega una skin
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'skin_added', {
    champion_name: 'Ahri',
    skin_name: 'K/DA',
    skin_price: 1350
  });
}
```

---

## 🛡️ Privacidad y GDPR

Google Analytics 4 es compatible con GDPR. Considera:

1. **Agregar un banner de cookies** (opcional pero recomendado)
2. **Política de privacidad** - Menciona que usas Google Analytics
3. **Anonimización de IP** - GA4 lo hace automáticamente

---

## 📱 Acceso Móvil

Descarga la app de Google Analytics para ver tus métricas en el móvil:

- [iOS](https://apps.apple.com/app/google-analytics/id881599038)
- [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.giant)

---

## 🆘 Solución de Problemas

### No veo datos en Google Analytics

1. **Verifica el Measurement ID** - Asegúrate de que sea correcto en `.env`
2. **Reinicia el servidor** - Los cambios en `.env` requieren reinicio
3. **Espera 24-48 horas** - Los datos pueden tardar en aparecer
4. **Verifica en Tiempo Real** - Debería aparecer inmediatamente

### Error: "gtag is not defined"

- El componente GoogleAnalytics solo se carga si `NEXT_PUBLIC_GA_MEASUREMENT_ID` está definido
- Verifica que la variable esté en `.env` y que hayas reiniciado el servidor

---

## 📚 Recursos Adicionales

- [Documentación oficial de GA4](https://support.google.com/analytics/answer/9304153)
- [Academia de Google Analytics](https://analytics.google.com/analytics/academy/)
- [Guía de eventos de GA4](https://support.google.com/analytics/answer/9267735)

---

## ✨ ¡Listo!

Una vez configurado, tendrás acceso completo a las métricas de tu aplicación. Podrás ver:

- Cuántas personas usan tu app
- De dónde son
- Qué páginas visitan más
- Cuánto tiempo pasan en tu app
- Y mucho más...

**¡Disfruta midiendo el éxito de My LoL Skins! 🎮📊**
