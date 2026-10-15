---
name: responder-cotizacion
description: Busca en Gmail solicitudes de cotización de baños portátiles sin responder y deja un borrador de respuesta para cada una. Úsala con "responde las cotizaciones", "¿quién pidió precio?", "revisa el correo de ventas".
---

# Responder cotizaciones

1. Busca en Gmail con `search_threads` hilos recientes (últimos 7 días si el usuario no dice otra cosa) que pidan cotización: palabras como `cotización`, `precio`, `renta`, `baños`, `sanitarios`, `evento`, `obra`. Descarta los que ya tienen respuesta nuestra.
2. Para cada solicitud, saca: nombre, tipo (evento u obra), fecha, días, lugar, número de personas o trabajadores.
3. Si falta la cantidad de unidades, calcúlala con la misma lógica de `calcEvento` / `calcObra` en `script.js`.
4. Crea un borrador con `create_draft` en el mismo hilo. Debe incluir:
   - Saludo con el nombre.
   - Unidades sugeridas (tipo y cantidad) y por qué.
   - Días de renta y frecuencia de limpieza.
   - Qué incluye: entrega, limpieza, insumos y retiro.
   - Precio: escribe `[PRECIO]` si el usuario no te lo dio. Nunca inventes precios.
   - Siguiente paso: confirmar dirección exacta y fecha de entrega.
   - Firma con el teléfono y correo de `index.html` (sección `#cotizar`).
5. **No envíes nada.** Solo borradores.
6. Termina con una tabla: cliente, fecha del evento/obra, unidades sugeridas, datos que faltan.
