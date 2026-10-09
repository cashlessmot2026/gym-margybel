# Margybel Pacheco Mitchell · App de entrenamiento

Clon de la app del gimnasio, con la marca de Margybel Pacheco Mitchell (verde `#B7FF00`, negro, gris `#6B6B6B`, blanco).

## Interfaces
- **Clientes** (`/`): login, **Soy nuevo** (autorregistro con el mismo formulario de inscripción), entrenamiento, comunidad, tienda, etc.
- **Administración** (`/admin`): panel del administrador **con todas las funciones del coach** (rutinas, grupos, ejercicios, analítica, clases). Ya no existe la interfaz de coach separada.
- `/check`: control de acceso (recepción / kiosko).

## Base de datos (Supabase `jehwevhxrnjxfepwaani`)
Ejecuta en el SQL Editor, en este orden: `supabase/schema.sql`, `02_push.sql`, `03_pagos_cop.sql`, `04_clases.sql`, `05_social.sql`, `06_tienda.sql`.
(`07_salud.sql` no hace falta.) Usuario inicial: `admin` / `admin123` — **cámbiala** al entrar.

### Edge Functions
`r2-upload`, `send-push`, `nutri-ai`, `class-reminders`. Secretos: `GEMINI_API_KEY`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`, `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `FCM_SERVICE_ACCOUNT`.
La clave pública VAPID del clon está en `src/lib/push.js`; la privada está solo en `.secrets/vapid.json` (no se sube a git).

## Notificaciones push
- Web/PWA: Service Worker + VAPID.
- APK Android: Firebase Cloud Messaging (`android/app/google-services.json`, paquete `com.margybel.fitness`).

## Desarrollo
```
npm ci
npm run dev
```
Variables opcionales (`.env.local`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_VAPID_PUBLIC_KEY`, `VITE_R2_PUBLIC_URL`.
