---
name: post-redes
description: Crea una o varias publicaciones para las redes sociales de Cabina Limpia y las deja programadas "para revisión" en Metricool. Úsala con "haz un post", "programa publicaciones de la semana", "publica sobre las unidades accesibles", etc.
---

# Publicación para redes

1. Lee `index.html` para tomar datos reales del negocio (unidades, servicio, preguntas frecuentes). No inventes precios ni promociones.
2. Con Metricool:
   - `getBrandSettings` → qué redes están conectadas.
   - `getBestTimeToPostByNetwork` → mejor horario para cada red.
   - `getScheduledPosts` → no repetir temas ni encimar horarios con lo que ya está programado.
3. Si el usuario no dio tema, propone 3 ideas y deja que elija. Ideas útiles:
   - "¿Cuántos baños necesita tu evento?" con la regla de la calculadora.
   - Qué incluye la limpieza programada.
   - Unidad accesible / remolque de lujo para bodas.
   - Obras: servicio semanal y cumplimiento.
4. Redacta el texto para cada red (corto y con hashtags locales en Instagram/TikTok, más informativo en Facebook/LinkedIn). Termina siempre con una llamada a la acción: cotizar por WhatsApp o usar la calculadora del sitio.
5. Muestra los textos al usuario. Cuando los apruebe, prográmalos con `createScheduledPostForReview`. **No uses `createScheduledPost`** salvo que el usuario pida explícitamente publicar sin revisión.
6. Termina con una tabla: fecha y hora, red, texto, estado.
