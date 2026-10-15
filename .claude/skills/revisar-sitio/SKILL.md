---
name: revisar-sitio
description: Abre el sitio de Cabina Limpia en un navegador real, toma capturas en celular y escritorio y busca errores de JavaScript, enlaces internos rotos y desbordes en pantallas pequeñas. Úsala para "revisa la página", "cómo se ve en el celular", o antes de publicar cambios.
---

# Revisar el sitio

1. Ejecuta el script de capturas desde la raíz del repo:

   ```bash
   NODE_PATH=$(npm root -g) node .claude/skills/revisar-sitio/capturas.js <carpeta-de-salida>
   ```

   Usa como carpeta de salida el directorio de borradores (scratchpad) de la sesión si existe; si no, `capturas/` (no la subas a git).

2. Mira las dos capturas (`celular.png` y `escritorio.png`) con la herramienta Read y revisa:
   - Que el texto no se corte ni se encime.
   - Que los botones de cotizar y WhatsApp se vean y sean fáciles de tocar en celular.
   - Que las ilustraciones y la calculadora se vean completas.
3. Si el script no encuentra Playwright, haz al menos la revisión estática: `node --check script.js` y busca enlaces `href="#..."` sin su `id`.
4. Informa: lo que está bien en una línea y luego cada problema con su sección y archivo. Envía las capturas al usuario.
