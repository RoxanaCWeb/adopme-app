## Contexto del Producto

**Adopme** es una plataforma web para organizaciones de rescate de mascotas que digitaliza el proceso de adopción.

**Usuarios principales:**

- **Admins**: Organizaciones que publican mascotas y gestionan solicitudes
- **Adoptantes**: Usuarios que buscan mascotas y envían solicitudes de adopción

**Flujo básico:**

1. Admin publica mascota con fotos y descripción
2. Adoptante explora catálogo y aplica a una mascota
3. Admin revisa solicitud y aprueba/rechaza
4. Sistema notifica por email cambios de estado

---

## Stack Tecnológico

{
  "frontend": {
    "framework": "Next.js 14+",
    "language": "TypeScript",
    "styling": "Tailwind CSS",
    "components": "Shadcn/ui",
    "routing": "App Router"
  },
  "backend": {
    "database": "Supabase (PostgreSQL)",
    "auth": "Supabase Auth",
    "storage": "Supabase Storage",
    "functions": "Supabase Edge Functions"
  },
  "deployment": {
    "hosting": "Vercel",
    "ci_cd": "GitHub Actions",
    "vcs": "GitHub"
  },
  "notifications": "Resend (email)"
}

---

## Esquema de Base de Datos

### Tabla: profiles

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefono TEXT,
  ubicacion TEXT,
  tipo_vivienda TEXT,
  experiencia_mascotas TEXT,
  rol TEXT NOT NULL CHECK (rol IN ('adoptante', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla: mascotas

```sql
CREATE TABLE mascotas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  especie TEXT NOT NULL CHECK (especie IN ('perro', 'gato', 'otro')),
  raza TEXT,
  edad INTEGER,
  tamano TEXT CHECK (tamano IN ('pequeño', 'mediano', 'grande')),
  sexo TEXT CHECK (sexo IN ('macho', 'hembra')),
  estado TEXT DEFAULT 'disponible' CHECK (estado IN ('disponible', 'en_proceso', 'adoptada', 'no_disponible')),
  descripcion TEXT,
  temperamento TEXT,
  necesidades_especiales TEXT,
  historia TEXT,
  fotos TEXT[], -- Array de URLs de Supabase Storage
  organizacion_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla: solicitudes

```sql
CREATE TABLE solicitudes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mascota_id UUID REFERENCES mascotas(id) ON DELETE CASCADE,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_revision', 'aprobada', 'rechazada')),
  motivacion TEXT NOT NULL,
  experiencia TEXT,
  vivienda TEXT,
  miembros_hogar TEXT,
  otras_mascotas TEXT,
  notas_admin TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(usuario_id, mascota_id)
);
```

---

## Funcionalidades Core (MVP)

### 1. Autenticación

- [ ]  Login con email/password
- [ ]  Registro de usuarios (adoptantes)
- [ ]  Recuperación de contraseña
- [ ]  Roles: admin y adoptante

### 2. Catálogo de Mascotas (Público)

- [ ]  Vista de grid con tarjetas de mascotas
- [ ]  Filtros: especie, tamaño, edad
- [ ]  Búsqueda por nombre
- [ ]  Página de detalle con galería de fotos
- [ ]  Solo mascotas con estado "disponible"

### 3. Gestión de Mascotas (Admin)

- [ ]  Crear mascota con upload de fotos
- [ ]  Editar información de mascota
- [ ]  Cambiar estado de mascota
- [ ]  Ver todas las mascotas (admin dashboard)

### 4. Sistema de Solicitudes

- [ ]  Formulario de solicitud (adoptantes autenticados)
- [ ]  Dashboard de solicitudes (admin)
- [ ]  Cambiar estado de solicitud (admin)
- [ ]  Ver mis solicitudes (adoptante)
- [ ]  Una solicitud activa por mascota por usuario

### 5. Notificaciones Email

- [ ]  Confirmación de registro
- [ ]  Nueva solicitud recibida (a admin)
- [ ]  Cambio de estado de solicitud (a adoptante)

---

## Rutas de la Aplicación

```
/                        → Landing page + catálogo público
/mascotas/[id]          → Detalle de mascota
/login                   → Login
/registro                → Registro de adoptante
/dashboard              → Dashboard general (redirige según rol)
/adoptante/solicitudes  → Mis solicitudes (adoptante)
/adoptante/perfil       → Mi perfil (adoptante)
/admin/mascotas         → Gestión de mascotas (admin)
/admin/solicitudes      → Gestión de solicitudes (admin)
```

---

## Requerimientos de UI/UX

**Diseño:**

- Mobile-first, responsive
- Paleta cálida y amigable (para adopción de mascotas)
- Tarjetas de mascotas con imagen destacada
- Formularios claros con validación

**Componentes clave:**

- Navbar con login/logout
- Tarjeta de mascota (grid item)
- Formulario de mascota (admin)
- Formulario de solicitud
- Filtros de búsqueda
- Galería de imágenes (lightbox)
- Estados visuales (badges para estado de mascota/solicitud)

**Accesibilidad:**

- Textos alternativos en imágenes
- Navegación por teclado
- Contraste WCAG AA

---

## Configuración Técnica

### Variables de Entorno

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

### Row Level Security (RLS) Policies

**Mascotas:**

- SELECT: Todos pueden ver mascotas disponibles
- INSERT/UPDATE/DELETE: Solo admins

**Solicitudes:**

- SELECT: Usuario puede ver sus propias solicitudes, admin puede ver todas
- INSERT: Solo usuarios autenticados (adoptantes)
- UPDATE: Solo admin puede cambiar estado

**Profiles:**

- SELECT: Usuario puede ver su propio perfil, admin puede ver todos
- UPDATE: Usuario puede actualizar su propio perfil

---

## Criterios de Éxito

✅ Usuario puede explorar catálogo sin autenticarse

✅ Adoptante puede registrarse y enviar solicitud

✅ Admin puede publicar mascotas con fotos

✅ Admin puede gestionar solicitudes

✅ Sistema envía emails de notificación

✅ Responsive en mobile y desktop

✅ Deploy funcional en Vercel

---

## Notas Técnicas

- Usar `next/image` para optimización de imágenes
- Implementar loading states (Suspense)
- Error boundaries para manejo de errores
- Validación con Zod
- Formularios con React Hook Form
- Usar Server Components cuando sea posible
- Client Components solo donde sea necesario (interactividad)

---

## Próximos Pasos (Fase 2)

- Sistema de mensajería interna
- Estadísticas y reportes
- Favoritos de mascotas
- Compartir en redes sociales
- Múltiples organizaciones