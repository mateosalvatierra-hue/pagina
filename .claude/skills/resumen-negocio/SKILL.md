---
name: resumen-negocio
description: Resumen del día o de la semana para Cabina Limpia — correos pendientes de clientes, entregas y retiros en el calendario y publicaciones programadas en redes. Úsala con "¿qué tengo hoy?", "resumen de la semana", "buenos días".
---

# Resumen del negocio

Junta la información, no cambies nada.

1. **Agenda** (Google Calendar, `list_events`): entregas, retiros y limpiezas de hoy (o de la semana). Para cada uno: hora, cliente, dirección, unidades.
2. **Correo** (Gmail, `search_threads`): hilos de clientes sin responder de los últimos 3 días. Marca los que son solicitudes de cotización.
3. **Redes** (Metricool, `getScheduledPosts`): publicaciones programadas para hoy y las que están esperando revisión.
4. Si alguna herramienta no está conectada, dilo en una línea y sigue con las demás.

Formato de respuesta, corto:

- **Hoy**: lista de entregas/retiros en orden de hora.
- **Por responder**: clientes y qué piden.
- **Redes**: qué sale hoy y qué falta aprobar.
- **Sugerencia**: una sola acción concreta (ej. "Hay 2 cotizaciones sin responder: usa `/responder-cotizacion`").
