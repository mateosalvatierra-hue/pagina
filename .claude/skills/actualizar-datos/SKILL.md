---
name: actualizar-datos
description: Cambia los datos del negocio Cabina Limpia (nombre, número de WhatsApp, teléfono visible, correo, horario o zona de cobertura) en todos los archivos donde aparecen. Úsala cuando el usuario diga "cambia el teléfono", "mi WhatsApp es...", "el negocio se llama...", etc.
---

# Actualizar datos del negocio

Los datos del negocio están repetidos en varios archivos. Cámbialos todos de una vez.

## Dónde está cada dato

| Dato | Lugares |
| --- | --- |
| Nombre ("Cabina Limpia") | `index.html`: `<title>`, `aria-label` del logo, `.brand-name` del encabezado y del pie, `©` del pie. `README.md`: título. `CLAUDE.md`: título. |
| WhatsApp | `script.js`: `var WHATSAPP_NUMBER` (solo dígitos, con código de país, sin `+`). `index.html`: `href` del botón flotante `#fabWa` (`https://wa.me/<número>`). |
| Teléfono visible | `index.html`: `#contactPhone` en la sección `#cotizar`. |
| Correo | `index.html`: sección `#cotizar`, lista `.contact-list`. |
| Horario | `index.html`: texto de `#cotizar` ("Respondemos de...") y pie de página. También la etiqueta `.hero-chip` de la portada si cambian los días. |
| Cobertura | `index.html`: sección `#cotizar`, `<dd>` de "Cobertura". |

## Pasos

1. Pregunta solo el dato que falte. Si el usuario da un teléfono, úsalo para WhatsApp y teléfono visible a menos que diga lo contrario.
2. Busca el valor viejo en todo el repo con `grep -rn` (excluye `.git`) para no dejar ninguna aparición, incluidas las que no estén en la tabla.
3. Formatos:
   - `WHATSAPP_NUMBER` y `wa.me/`: solo dígitos, con código de país. Ej. México `52` + 10 dígitos.
   - Teléfono visible: con `+` y espacios, ej. `+52 55 1234 5678`.
4. Haz los cambios y vuelve a buscar el valor viejo: debe dar cero resultados.
5. Muestra una tabla con cada archivo y línea cambiada.
