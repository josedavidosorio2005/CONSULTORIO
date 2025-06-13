# FisioSalut - Centro de Fisioterapia Profesional

![FisioSalut](https://via.placeholder.com/800x400/1e40af/ffffff?text=FisioSalut)

## 🏥 Descripción

FisioSalut es una aplicación web moderna para un centro de fisioterapia profesional, desarrollada con Next.js 15, React 19, TypeScript y Tailwind CSS. La aplicación ofrece una experiencia completa para pacientes y profesionales de la salud.

## ✨ Características Principales

### 🎯 Para Pacientes
- **Reserva de Citas Online**: Sistema intuitivo para agendar citas
- **Catálogo de Servicios**: Información detallada de todos los tratamientos
- **Formularios de Contacto**: Comunicación directa con el centro
- **Calendario Interactivo**: Visualización de horarios disponibles
- **WhatsApp Integration**: Contacto directo vía WhatsApp
- **Responsive Design**: Funciona perfectamente en todos los dispositivos

### 🔧 Características Técnicas
- **Framework**: Next.js 15 con App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4 con tema oscuro/claro
- **Animaciones**: Framer Motion para transiciones fluidas
- **Validación**: Sistema robusto de validación de formularios
- **Notificaciones**: Sistema de toast notifications
- **SEO Optimizado**: Meta tags, Open Graph, Schema markup
- **Accesibilidad**: Cumple estándares WCAG
- **Testing**: Jest y React Testing Library
- **Performance**: Optimizado para Core Web Vitals
- **🗓️ Google Calendar Integration**: Sincronización automática de citas

### 🎨 Integración con Google Calendar
- **Sincronización Automática**: Las citas se crean automáticamente en Google Calendar
- **Horarios Reales**: Consulta de disponibilidad en tiempo real
- **Notificaciones por Email**: Invitaciones automáticas a los pacientes
- **Gestión Centralizada**: Todas las citas en un solo lugar
- **Cancelación Automática**: Sincronización bidireccional

## 🚀 Tecnologías Utilizadas

### Core
- [Next.js 15](https://nextjs.org/) - Framework de React
- [React 19](https://reactjs.org/) - Biblioteca de interfaz de usuario
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS 4](https://tailwindcss.com/) - Framework de CSS

### UI/UX
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [Headless UI](https://headlessui.dev/) - Componentes accesibles
- [Heroicons](https://heroicons.com/) - Iconos SVG
- [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer) - Animaciones al scroll

### Desarrollo
- [ESLint](https://eslint.org/) - Linting
- [Jest](https://jestjs.io/) - Testing framework
- [React Testing Library](https://testing-library.com/) - Testing utilities

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/fisiosalut.git
cd fisiosalut
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus configuraciones:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PHONE_NUMBER=+34600000000
NEXT_PUBLIC_EMAIL=info@fisiosalut.com
# ... otras variables
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Abrir el navegador**
Ve a [http://localhost:3000](http://localhost:3000)

## 🏗️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Ejecuta en modo desarrollo con Turbopack

# Construcción
npm run build        # Construye para producción
npm run start        # Ejecuta la build de producción

# Linting
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Ejecuta ESLint y corrige errores automáticamente

# Testing
npm run test         # Ejecuta los tests
npm run test:watch   # Ejecuta tests en modo watch
npm run test:coverage # Ejecuta tests con coverage
```

## 📁 Estructura del Proyecto

```
fisiosalut/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── globals.css         # Estilos globales
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página de inicio
│   │   ├── not-found.tsx       # Página 404
│   │   ├── error.tsx           # Página de error
│   │   ├── agenda/             # Página de agenda
│   │   ├── cita/               # Página de reserva de citas
│   │   ├── contacto/           # Página de contacto
│   │   ├── servicios/          # Página de servicios
│   │   └── sobre-nosotros/     # Página sobre nosotros
│   ├── components/             # Componentes reutilizables
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                 # Componentes de UI
│   │       ├── AnimatedBackground.tsx
│   │       ├── Button.tsx
│   │       ├── Calendar.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── PageTransition.tsx
│   │       ├── ToastProvider.tsx
│   │       ├── WhatsAppButton.tsx
│   │       └── WhatsAppFloatingButton.tsx
│   ├── hooks/                  # Custom hooks
│   │   └── useValidation.ts
│   └── __tests__/              # Tests
│       └── Home.test.tsx
├── public/                     # Archivos estáticos
├── .env.example               # Variables de entorno de ejemplo
├── jest.config.js             # Configuración de Jest
├── jest.setup.js              # Setup de Jest
├── next.config.ts             # Configuración de Next.js
├── tailwind.config.ts         # Configuración de Tailwind
└── tsconfig.json              # Configuración de TypeScript
```

## 🎨 Personalización

### Colores y Tema
Edita `tailwind.config.ts` para personalizar los colores:
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... más colores
        }
      }
    }
  }
}
```

### Componentes
Los componentes están ubicados en `src/components/` y son completamente reutilizables.

## 🧪 Testing

Ejecuta los tests:
```bash
npm run test
```

Para coverage:
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recomendado)
1. Push tu código a GitHub
2. Conecta tu repo en [Vercel](https://vercel.com)
3. Las variables de entorno se configuran en el dashboard

### Otras plataformas
```bash
npm run build
npm run start
```

## 📝 Funcionalidades Principales

### ✅ Implementadas
- [x] Diseño responsive completo
- [x] Sistema de reserva de citas
- [x] Formularios con validación
- [x] Notificaciones toast
- [x] Tema claro/oscuro
- [x] Animaciones fluidas
- [x] SEO optimizado
- [x] Accesibilidad web
- [x] Testing básico
- [x] Gestión de errores
- [x] WhatsApp integration
- [x] Google Calendar integration

### 🔄 En desarrollo / Futuras mejoras
- [ ] Base de datos para persistencia
- [ ] Sistema de autenticación
- [ ] Panel de administración
- [ ] API para gestión de citas
- [ ] Integración con calendarios
- [ ] Sistema de pagos
- [ ] Notificaciones push
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Chat en vivo

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# Aplicación
NEXT_PUBLIC_APP_URL=https://fisiosalut.com
NEXT_PUBLIC_APP_NAME=FisioSalut

# Contacto
NEXT_PUBLIC_PHONE_NUMBER=+34600000000
NEXT_PUBLIC_EMAIL=info@fisiosalut.com
NEXT_PUBLIC_ADDRESS=Calle Principal, 123

# Redes sociales
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/fisiosalut
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/fisiosalut

# Analíticas
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Base de datos (futuro)
DATABASE_URL=postgresql://...

# Autenticación (futuro)
NEXTAUTH_SECRET=your-secret-key
```

## 🗓️ Configuración de Google Calendar

### Prerequisitos
1. Cuenta de Google con acceso a Google Calendar
2. Proyecto en Google Cloud Console
3. API de Google Calendar habilitada

### Paso 1: Configurar Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Calendar:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Calendar API"
   - Haz clic en "Enable"

### Paso 2: Crear Credenciales OAuth2

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "OAuth client ID"
3. Selecciona "Web application"
4. Configura:
   - **Name**: FisioSalut Calendar Integration
   - **Authorized redirect URIs**: 
     - `http://localhost:3000/api/auth/google/callback` (desarrollo)
     - `https://tudominio.com/api/auth/google/callback` (producción)

### Paso 3: Configurar Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# Google Calendar API
GOOGLE_CLIENT_ID=tu_client_id_aquí
GOOGLE_CLIENT_SECRET=tu_client_secret_aquí
GOOGLE_REFRESH_TOKEN=se_obtiene_después_de_autorización
GOOGLE_CALENDAR_ID=primary
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

### Paso 4: Autorización Inicial

1. Ejecuta la aplicación: `npm run dev`
2. Ve a `http://localhost:3000/admin/calendar-setup`
3. Haz clic en "Generar URL de Autorización"
4. Sigue el proceso de autorización de Google
5. Copia el refresh token obtenido a tu archivo `.env.local`

### Paso 5: Verificar Integración

1. Ve a la página de citas: `http://localhost:3000/cita`
2. Selecciona una fecha en el calendario
3. Los horarios disponibles se cargarán desde Google Calendar
4. Reserva una cita de prueba
5. Verifica que aparece en tu Google Calendar

### 🔧 Funcionalidades de la Integración

- **✅ Creación Automática**: Las citas se crean automáticamente en Google Calendar
- **✅ Consulta de Disponibilidad**: Horarios libres consultados en tiempo real
- **✅ Invitaciones por Email**: Los pacientes reciben invitaciones automáticamente
- **✅ Sincronización Bidireccional**: Cambios en Google Calendar se reflejan en la app
- **✅ Zona Horaria**: Configurada para España (Europe/Madrid)

### 🚨 Solución de Problemas

**Error: "Invalid credentials"**
- Verifica que GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET sean correctos
- Asegúrate de que el redirect URI coincida exactamente

**Error: "Calendar not accessible"**
- Verifica que GOOGLE_CALENDAR_ID sea correcto (usa 'primary' para el calendario principal)
- Comprueba que el refresh token sea válido

**Error: "Quota exceeded"**
- Google Calendar API tiene límites de uso
- Para producción, considera solicitar aumento de cuota

### 📝 Notas Importantes

- El refresh token es permanente hasta que sea revocado
- Guarda el refresh token de forma segura
- Para producción, usa variables de entorno del servidor
- Puedes usar calendarios específicos cambiando GOOGLE_CALENDAR_ID

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: info@fisiosalut.com
- 📱 WhatsApp: +34 600 000 000
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/fisiosalut/issues)

## 🙏 Agradecimientos

- [Next.js Team](https://nextjs.org/) por el increíble framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [Framer Motion](https://www.framer.com/motion/) por las animaciones
- [Heroicons](https://heroicons.com/) por los iconos

---

**FisioSalut** - Cuidando tu salud con tecnología moderna 💙
