# FisioSalut - Centro de Fisioterapia

Una aplicación web moderna para un centro de fisioterapia construida con Next.js 15, TypeScript, Tailwind CSS y Prisma.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Formularios Funcionales**: Los formularios de contacto y citas ahora se conectan a una base de datos real
- **Base de Datos SQLite**: Almacenamiento persistente de mensajes y citas con Prisma ORM
- **APIs REST**: Endpoints funcionales para guardar y consultar datos
- **Panel de Administración**: Interface para gestionar mensajes y citas programadas
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **Interfaz Moderna**: Diseño limpio con Tailwind CSS

### 🔧 Tecnologías Utilizadas
- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilos**: Tailwind CSS, Headless UI
- **Base de Datos**: SQLite con Prisma ORM
- **Validación**: Zod para validación de esquemas
- **Formularios**: React Hook Form
- **Iconos**: Heroicons

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd fisiosalut
   ```

2. **Instalar dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configurar la base de datos**
   ```bash
   # Generar el cliente de Prisma
   npx prisma generate
   
   # Crear la base de datos y aplicar el schema
   npx prisma db push
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── admin/                 # Panel de administración
│   ├── api/
│   │   ├── contacto/         # API para mensajes de contacto
│   │   └── citas/            # API para citas médicas
│   ├── cita/                 # Página de reserva de citas
│   ├── contacto/             # Página de contacto
│   └── ...
├── components/
│   ├── layout/               # Componentes de layout (Header, Footer)
│   └── ui/                   # Componentes de interfaz
├── lib/
│   └── prisma.ts            # Configuración de Prisma
└── ...

prisma/
├── schema.prisma            # Schema de la base de datos
└── dev.db                   # Base de datos SQLite (generada)
```

## 🗄️ Base de Datos

### Modelos de Datos

#### Contacto
- `id`: Identificador único
- `nombre`: Nombre del contacto
- `email`: Email del contacto
- `telefono`: Teléfono (opcional)
- `mensaje`: Mensaje del contacto
- `leido`: Estado de lectura
- `createdAt` / `updatedAt`: Timestamps

#### Cita
- `id`: Identificador único
- `nombre`: Nombre del paciente
- `email`: Email del paciente
- `telefono`: Teléfono del paciente
- `servicio`: Tipo de servicio solicitado
- `fecha`: Fecha de la cita
- `hora`: Hora de la cita
- `mensaje`: Comentarios adicionales (opcional)
- `estado`: Estado de la cita (PENDIENTE, CONFIRMADA, CANCELADA)
- `createdAt` / `updatedAt`: Timestamps

#### Servicio
- `id`: Identificador único
- `nombre`: Nombre del servicio
- `descripcion`: Descripción del servicio
- `precio`: Precio del servicio
- `duracion`: Duración en minutos
- `activo`: Si el servicio está activo
- `createdAt` / `updatedAt`: Timestamps

## 🔗 APIs

### Contacto
- `POST /api/contacto`: Crear nuevo mensaje de contacto
- `GET /api/contacto`: Obtener lista de mensajes de contacto

### Citas
- `POST /api/citas`: Crear nueva cita
- `GET /api/citas`: Obtener lista de citas
- `GET /api/citas?fecha=YYYY-MM-DD`: Obtener citas de una fecha específica

## 📊 Panel de Administración

Accede al panel de administración en `/admin` para:
- Ver todos los mensajes de contacto recibidos
- Gestionar las citas programadas
- Revisar el estado de las solicitudes

**Nota**: En una implementación de producción, este panel debería estar protegido con autenticación.

## 🛠️ Herramientas de Desarrollo

### Prisma Studio
Para explorar y editar la base de datos visualmente:
```bash
npx prisma studio
```
Accede en: `http://localhost:5555`

### Scripts Disponibles
```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en modo producción
npm run lint         # Ejecutar linter
```

## 🎨 Personalización

### Servicios
Los servicios disponibles están definidos en `src/app/cita/page.tsx`. Puedes modificar la lista según tus necesidades:

```typescript
const servicios = [
  'Fisioterapia Deportiva',
  'Rehabilitación Física',
  'Terapia Manual',
  'Fisioterapia Neurológica',
  'Masaje Terapéutico',
];
```

### Horarios
Los horarios disponibles están en el mismo archivo:

```typescript
const horasDisponibles = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30'
];
```

## 🔄 Próximas Mejoras

- [ ] Autenticación para el panel de administración
- [ ] Sistema de notificaciones por email
- [ ] Calendario interactivo para selección de fechas
- [ ] Confirmación automática de citas
- [ ] Sistema de recordatorios
- [ ] Integración con sistemas de pago
- [ ] Historial médico de pacientes

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Contacto

Para soporte o consultas sobre el proyecto:
- Email: info@fisiosalut.com
- Teléfono: +34 91 123 45 67

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**FisioSalut** - Tu bienestar es nuestra prioridad 💙
