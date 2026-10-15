# Cabina Limpia — contexto para Claude

Sitio estático de un negocio de renta de baños portátiles. Sin dependencias ni build: `index.html`, `styles.css`, `script.js`. Se publica con GitHub Pages.

## Reglas

- Responde y escribe siempre en español.
- No agregues frameworks, npm ni herramientas de build: el sitio debe seguir abriéndose con doble clic en `index.html`.
- Los datos del negocio (nombre, WhatsApp, teléfono, correo, horario, cobertura) aparecen en varios lugares. Cámbialos con la skill `/actualizar-datos` para no dejar ninguno atrás.
- Antes de subir cambios al sitio, usa el agente `revisor-codigo`.
- Nunca publiques en redes sociales ni envíes correos sin que el usuario lo confirme. Deja borradores o publicaciones "para revisión".

## Agentes (`.claude/agents/`)

| Agente | Para qué |
| --- | --- |
| `editor-web` | Cambios en el sitio: textos, secciones, estilos, calculadora. |
| `revisor-codigo` | Revisa los cambios antes de subirlos (solo lectura). |
| `redes-sociales` | Ideas, textos y programación de publicaciones con Metricool. |
| `asistente-negocio` | Gmail, Google Calendar y Drive: cotizaciones, agenda, resúmenes. |

## Skills (`.claude/skills/`)

| Skill | Para qué |
| --- | --- |
| `/actualizar-datos` | Cambia nombre, WhatsApp, teléfono, correo, horario o cobertura en todos los archivos. |
| `/revisar-sitio` | Abre el sitio en un navegador, toma capturas en celular y escritorio y busca errores. |
| `/post-redes` | Crea una publicación sobre el negocio y la deja para revisión en Metricool. |
| `/responder-cotizacion` | Busca solicitudes de cotización en Gmail y deja borradores de respuesta. |
| `/resumen-negocio` | Resumen del día: correos pendientes, entregas en el calendario, publicaciones programadas. |
