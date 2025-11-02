# Plan de Desarrollo - Adopme

Este plan describe los pasos técnicos para construir la plataforma Adopme, priorizando una entrega incremental y ordenada.

## Fase 1: Configuración Inicial y Repositorio (Prioridad #1)

El objetivo de esta fase es establecer las bases del proyecto, asegurando que el control de versiones y la estructura inicial estén listos.

1.  **Inicializar Repositorio en GitHub:**
    *   Crearé un repositorio público en GitHub.
    *   Configuraré un archivo `.gitignore` optimizado para Next.js para evitar subir archivos innecesarios (`node_modules`, `.env.local`, etc.).
    *   Generaré un `README.md` inicial con la descripción del proyecto extraída de `adopme-info.md`.

2.  **Inicializar Proyecto Next.js:**
    *   Utilizaré `npx create-next-app@latest` para configurar un nuevo proyecto Next.js.
    *   La configuración incluirá:
        *   **Lenguaje:** TypeScript
        *   **Styling:** Tailwind CSS
        *   **Router:** App Router
    *   Estableceré una estructura de carpetas básica para organizar componentes, rutas y lógica de negocio.

## Fase 2: Frontend y UI (Prioridad #2)

Con el proyecto base configurado, el siguiente paso es construir la interfaz de usuario pública, enfocándonos en la experiencia del adoptante.

1.  **Integrar Componentes y Estilos:**
    *   Inicializaré **Shadcn/ui** sobre nuestra configuración de Tailwind CSS para disponer de una biblioteca de componentes base (botones, inputs, tarjetas).
    *   Crearé los componentes reutilizables clave definidos en los requerimientos de UI/UX, como `PetCard`, `Navbar` y `FilterControls`.

2.  **Maquetar Vistas Públicas:**
    *   Desarrollaré la página de inicio (`/`) que mostrará el catálogo de mascotas disponibles.
    *   Crearé la página de detalle de mascota (`/mascotas/[id]`), que mostrará la información completa y galería de fotos.
    *   Implementaré el layout principal de la aplicación, incluyendo la barra de navegación y el pie de página.

## Fase 3: Autenticación y Base de Datos (Prioridad #3)

En esta fase, conectaremos la aplicación a Supabase para gestionar los datos y la autenticación de usuarios.

1.  **Configurar Supabase:**
    *   Crearé un nuevo proyecto en Supabase.
    *   Ejecutaré los scripts SQL de `adopme-info.md` para crear las tablas: `profiles`, `mascotas` y `solicitudes`.
    *   Configuraré las políticas de **Row Level Security (RLS)** para proteger los datos.
    *   Gestionaré las variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) de forma segura.

2.  **Implementar Flujo de Autenticación:**
    *   Configuraré **Supabase Auth** para autenticación con email y contraseña.
    *   Crearé las rutas y formularios para `/login`, `/registro` y recuperación de contraseña.
    *   Implementaré la lógica para proteger rutas según el rol del usuario (`adoptante` vs `admin`).

## Fase 4: Funcionalidades Core (Admin y Adoptante)

Ahora que los usuarios pueden registrarse y autenticarse, implementaremos las funcionalidades principales de la plataforma.

1.  **Módulo de Administración (Admin):**
    *   Crearé el dashboard de admin para ver y gestionar las mascotas (`/admin/mascotas`).
    *   Desarrollaré el formulario para **crear y editar mascotas**, incluyendo la lógica para subir imágenes a **Supabase Storage**.
    *   Implementaré el dashboard de gestión de solicitudes (`/admin/solicitudes`), permitiendo a los admins revisar y cambiar el estado de las mismas.

2.  **Módulo de Adopción (Adoptante):**
    *   Desarrollaré el formulario de solicitud de adopción, accesible solo para adoptantes autenticados.
    *   Crearé la página `/adoptante/solicitudes` donde los usuarios podrán ver el estado de sus solicitudes.

3.  **Sistema de Notificaciones:**
    *   Integraré **Resend** para el envío de correos transaccionales.
    *   Crearé **Supabase Edge Functions** que se activarán con cambios en la base de datos (ej. un nuevo registro o un cambio de estado en una solicitud) para enviar notificaciones por email.

## Fase 5: Despliegue y CI/CD (Prioridad #4)

Finalmente, desplegaremos la aplicación y automatizaremos el proceso para futuras actualizaciones.

1.  **Despliegue en Vercel:**
    *   Conectaré el repositorio de GitHub a un nuevo proyecto en Vercel.
    *   Configuraré las variables de entorno del backend (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) en Vercel.
    *   Realizaré el despliegue inicial.

2.  **Automatización (CI/CD):**
    *   Configuraré **GitHub Actions** para ejecutar automáticamente tareas de calidad de código (como `linting` y `type-checking`) en cada `push`.
    *   Vercel se encargará del despliegue continuo, actualizando la aplicación con cada `merge` a la rama principal.

---

Con este plan, podemos empezar a trabajar. ¿Estás de acuerdo con esta estructura? Si es así, procederé con la primera fase: **Configuración Inicial y Repositorio**.
