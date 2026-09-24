# Portafolio — Nicolás Andrés Gómez Ramírez

Sitio personal de una sola página, bilingüe (ES/EN), con tema oscuro y claro.
Perfil híbrido: ingeniería electrónica y sistemas embebidos por un lado, desarrollo
de producto web por el otro.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion 13

---

## Cómo correrlo

```bash
npm install
npm run dev
```

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila a `dist/` para producción |
| `npm run preview` | Sirve localmente lo que quedó en `dist/` |

---

## Dónde se edita el contenido

**Todo el texto vive en un solo archivo: [`src/data/content.js`](src/data/content.js).**
No hace falta tocar los componentes para cambiar textos, proyectos o fechas.

| Constante | Qué controla |
| --- | --- |
| `PROFILE` | Nombre, correo, teléfono, GitHub, LinkedIn, foto, CV |
| `NAV` | Secciones del menú |
| `UI` | Todos los textos de interfaz, en `es` y `en` |
| `NOW` | Tarjetas de "Ahora mismo" |
| `EXPERIENCE` | Monitorías, tutorías y trabajos |
| `EDUCATION` | Formación académica |
| `PROJECTS` | Proyectos, con su stack, métricas y enlaces |
| `SKILLS` | Herramientas agrupadas por categoría |
| `LANGUAGES` | Idiomas y nivel |

Cada entrada tiene sus campos `es` y `en` juntos, así que al traducir algo no hay
que buscarlo en dos sitios.

---

## Pendientes

Los puntos marcados con `⚠ PENDIENTE` dentro de `content.js`:

- [ ] **Foto** → dejarla en `public/assets/foto.jpg`. Vertical (proporción 4:5),
      mínimo 800 px de ancho. Mientras no exista, el hero muestra un marco con
      las iniciales en lugar de romperse.
- [ ] **LinkedIn** → poner la URL en `PROFILE.linkedin`. Si sigue en `null`,
      el enlace no aparece ni en contacto ni en el pie de página.
- [ ] **PROTEO** → falta la descripción real del proyecto (qué medía, qué
      sensores, en qué materia, si fue en equipo). El texto actual es genérico.
- [ ] **Números de impacto** → estudiantes por semestre en cada monitoría, horas
      reales de tutoría, uso real del piloto de Voltio.
- [ ] **Equipos** → qué proyectos fueron en grupo y cuál fue el rol de cada quien.

---

## Publicar en Vercel

El repositorio todavía no está inicializado en git. Una vez creado y subido a GitHub:

1. Entrar a [vercel.com/new](https://vercel.com/new) e importar el repositorio.
2. Vercel detecta Vite solo. Build: `npm run build` · Output: `dist`.
3. Cada `git push` vuelve a desplegar.

---

## Notas de implementación

- **Tema y idioma** se guardan en `localStorage` (`ng-theme`, `ng-lang`) y se leen
  dentro de un `try/catch`: en modo privado el sitio sigue funcionando, solo no recuerda
  la preferencia. El tema por defecto es oscuro, que es para el que está diseñada la paleta.
- **Estadísticas de GitHub** se piden a la API pública sin token y se cachean 6 horas
  en el navegador, porque el límite anónimo es de 60 peticiones por hora e IP. Si la
  petición falla, la sección muestra un mensaje en vez de romperse.
- **Animaciones de entrada** usan `useInViewOnce`, un `IntersectionObserver` propio, y
  se desactivan por completo con `prefers-reduced-motion`.
- **Colores** están definidos como variables CSS en `src/index.css` y se exponen a
  Tailwind con `@theme inline`, que es lo que permite cambiar de tema en caliente.
