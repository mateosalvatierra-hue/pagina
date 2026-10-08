# Cabina Limpia — sitio web de renta de baños portátiles

Sitio estático (HTML, CSS y JavaScript sin dependencias) para un negocio de renta de baños portátiles.

## Secciones

- **Inicio**: propuesta de valor, botones de cotización y ficha técnica de la unidad estándar.
- **Para quién**: obras, eventos y bodas, ferias y conciertos, emergencias.
- **Unidades**: estándar, con lavamanos, accesible y remolque de lujo, con medidas y lo que incluye cada una.
- **Calculadora**: estima cuántos baños se necesitan para un evento (invitados, horas, alcohol, comida) o una obra (trabajadores, jornada semanal) y pasa el resultado al formulario.
- **Servicio**: los cuatro pasos de la renta y una tabla de frecuencia de limpieza.
- **Preguntas frecuentes**.
- **Cotización**: formulario que arma el mensaje y lo abre en WhatsApp con el texto ya escrito.

## Cómo verlo

Abre `index.html` en el navegador. No necesita servidor ni instalación.

## Qué personalizar antes de publicar

| Dato | Dónde |
| --- | --- |
| Nombre del negocio ("Cabina Limpia") | `index.html` (encabezado, pie y `<title>`) |
| Número de WhatsApp | `script.js`, constante `WHATSAPP_NUMBER` (solo dígitos, con código de país) |
| Teléfono y correo visibles | `index.html`, sección `#cotizar` |
| Horario y zona de cobertura | `index.html`, sección `#cotizar` y pie de página |
| Medidas y equipamiento de las unidades | `index.html`, sección `#unidades` |
| Proporciones de la calculadora | `script.js`, funciones `calcEvento` y `calcObra` |

## Publicarlo gratis

Con GitHub Pages: en el repositorio ve a **Settings → Pages**, elige la rama y la carpeta raíz, y guarda. El sitio queda en `https://<usuario>.github.io/<repositorio>/`.
