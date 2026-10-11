(function () {
  "use strict";

  // Número de WhatsApp del negocio en formato internacional, solo dígitos.
  var WHATSAPP_NUMBER = "525500000000";

  var $ = function (id) { return document.getElementById(id); };

  // Año del pie de página
  var year = $("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Indicador LIBRE / OCUPADO de la cabina central de la portada
  var cabinBtn = $("cabinBtn");
  var cabinInd = $("cabinIndicator");
  var cabinText = $("cabinIndicatorText");
  if (cabinBtn && cabinInd && cabinText) {
    cabinBtn.addEventListener("click", function () {
      var busy = cabinBtn.getAttribute("aria-pressed") !== "true";
      cabinBtn.setAttribute("aria-pressed", String(busy));
      cabinText.textContent = busy ? "OCUPADO" : "LIBRE";
      cabinInd.setAttribute("class", "ind " + (busy ? "ind-busy" : "ind-ok"));
    });
  }

  // Menú en celular
  var menuBtn = $("menuBtn");
  var nav = $("nav");
  function closeMenu() {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  menuBtn.addEventListener("click", function () {
    var open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  // Botón flotante de WhatsApp
  var fab = $("fabWa");
  if (fab) fab.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hola, quiero información sobre la renta de baños portátiles.");

  // Ocultar el botón flotante mientras el formulario está en pantalla
  var quoteSection = $("cotizar");
  if (fab && quoteSection && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      fab.classList.toggle("is-hidden", entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(quoteSection);
  }

  // Resaltar en el menú la sección visible
  var navLinks = {};
  nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    if ($(id)) navLinks[id] = a;
  });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          navLinks[entry.target.id].removeAttribute("aria-current");
          return;
        }
        Object.keys(navLinks).forEach(function (id) {
          if (id === entry.target.id) navLinks[id].setAttribute("aria-current", "location");
          else navLinks[id].removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(navLinks).forEach(function (id) { spy.observe($(id)); });
  }

  // Botones − / + de los campos numéricos
  document.querySelectorAll(".stepper-btn").forEach(function (btn) {
    var input = $(btn.getAttribute("data-target"));
    var step = parseInt(btn.getAttribute("data-step"), 10);
    btn.addEventListener("click", function () {
      var min = parseInt(input.min, 10) || 1;
      var max = parseInt(input.max, 10) || Infinity;
      var current = parseInt(input.value, 10);
      if (!isFinite(current)) current = min;
      // Con pasos de 5 o 10, redondea al múltiplo más cercano en la dirección del botón
      var next = Math.abs(step) > 1
        ? (step > 0 ? Math.floor(current / step) * step + step : Math.ceil(current / -step) * -step + step)
        : current + step;
      input.value = String(Math.min(max, Math.max(min, next)));
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  // ---------- Calculadora ----------
  var mode = "evento";
  var tabs = document.querySelectorAll(".calc-tabs [role=tab]");
  var panels = { evento: $("panelEvento"), obra: $("panelObra") };
  var lastResult = { units: 1, mode: "evento" };

  function num(id, fallback) {
    var v = parseInt($(id).value, 10);
    return isFinite(v) && v > 0 ? v : fallback;
  }

  function plural(n, one, many) { return n === 1 ? one : many; }

  // Evento: 1 baño por cada 50 invitados hasta 4 h; +10 % por cada hora extra;
  // +15 % si hay alcohol. Al menos 1 accesible por cada 20 unidades.
  function calcEvento() {
    var people = num("calcPeople", 1);
    var hours = num("calcHours", 1);
    var alcohol = $("calcAlcohol").checked;
    var food = $("calcFood").checked;

    var factor = 1 + Math.max(0, hours - 4) * 0.1;
    if (alcohol) factor *= 1.15;
    var units = Math.max(1, Math.ceil((people / 50) * factor));
    var accessible = Math.max(1, Math.ceil(units / 20));
    var sinks = food ? Math.max(1, Math.ceil(units / 4)) : 0;

    var lines = [
      accessible + " " + plural(accessible, "debe ser accesible", "deben ser accesibles") + " para silla de ruedas (en amarillo)",
      sinks
        ? "Agrega " + sinks + " " + plural(sinks, "lavamanos", "lavamanos") + " porque habrá comida"
        : "Sin comida, el lavamanos es opcional",
      hours > 10
        ? "Para más de 10 horas conviene una limpieza durante el evento"
        : "Entrega lista para usar; no requiere limpieza intermedia"
    ];
    return { units: units, accessible: accessible, lines: lines };
  }

  // Obra: 1 baño por cada 10 trabajadores con jornada de 40 h y limpieza semanal.
  function calcObra() {
    var workers = num("calcWorkers", 1);
    var weekHours = num("calcWeekHours", 40);
    var units = Math.max(1, Math.ceil((workers / 10) * (weekHours / 40)));
    var perUnit = workers / units;
    var visits = perUnit > 10 ? "2 limpiezas por semana" : "1 limpieza por semana";
    var lines = [
      "Servicio recomendado: " + visits,
      "1 lavamanos por frente de trabajo",
      "Renta mensual: la opción más económica en obra"
    ];
    return { units: units, accessible: 0, lines: lines };
  }

  function renderCalc() {
    var r = mode === "evento" ? calcEvento() : calcObra();
    lastResult = { units: r.units, mode: mode };
    $("calcUnits").textContent = String(r.units);
    $("calcUnitsWord").textContent = plural(r.units, "baño", "baños");
    var cabins = $("calcCabins");
    cabins.textContent = "";
    var MAX = 40;
    var shown = Math.min(r.units, MAX);
    for (var i = 0; i < shown; i++) {
      var m = document.createElement("span");
      m.className = i < r.accessible ? "mini mini-acc" : "mini";
      cabins.appendChild(m);
    }
    if (r.units > MAX) {
      var more = document.createElement("span");
      more.className = "mini-more";
      more.textContent = "+" + (r.units - MAX);
      cabins.appendChild(more);
    }
    var list = $("calcBreakdown");
    list.textContent = "";
    r.lines.forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t;
      list.appendChild(li);
    });
  }

  function setMode(next) {
    mode = next;
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-mode") === next;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    Object.keys(panels).forEach(function (k) { panels[k].hidden = k !== next; });
    renderCalc();
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { setMode(t.getAttribute("data-mode")); });
    t.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var next = mode === "evento" ? "obra" : "evento";
      setMode(next);
      document.querySelector('.calc-tabs [data-mode="' + next + '"]').focus();
    });
  });

  ["calcPeople", "calcHours", "calcAlcohol", "calcFood", "calcWorkers", "calcWeekHours"].forEach(function (id) {
    var el = $(id);
    el.addEventListener("input", renderCalc);
    el.addEventListener("change", renderCalc);
  });

  $("calcUse").addEventListener("click", function () {
    $("qQty").value = String(lastResult.units);
    $("qType").value = lastResult.mode === "obra" ? "Obra de construcción" : "Evento";
    $("cotizar").scrollIntoView({ block: "start" });
    $("qName").focus({ preventScroll: true });
  });

  renderCalc();

  // Botones "Cotizar ..." de cada unidad preseleccionan la unidad
  document.querySelectorAll("[data-unit]").forEach(function (a) {
    a.addEventListener("click", function () { $("qUnit").value = a.getAttribute("data-unit"); });
  });

  // ---------- Cotización ----------
  var form = $("quoteForm");
  var dateInput = $("qDate");
  var today = new Date();
  var iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = iso;

  function formatDate(value) {
    var parts = value.split("-");
    return parts.length === 3 ? parts[2] + "/" + parts[1] + "/" + parts[0] : value;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var required = ["qName", "qPhone", "qQty", "qDate", "qPlace"];
    var missing = [];
    required.forEach(function (id) {
      var el = $(id);
      var ok = el.value.trim() !== "" && el.checkValidity();
      el.setAttribute("aria-invalid", String(!ok));
      if (!ok) missing.push(el);
    });

    var err = $("qError");
    if (missing.length) {
      err.textContent = "Completa los campos marcados en rojo para preparar tu solicitud.";
      err.hidden = false;
      missing[0].focus();
      return;
    }
    err.hidden = true;

    var msg = [
      "Hola, quiero cotizar la renta de baños portátiles.",
      "",
      "Nombre: " + $("qName").value.trim(),
      "Teléfono: " + $("qPhone").value.trim(),
      "Uso: " + $("qType").value,
      "Unidad: " + $("qUnit").value,
      "Cantidad: " + $("qQty").value,
      "Fecha de entrega: " + formatDate($("qDate").value),
      "Lugar: " + $("qPlace").value.trim()
    ];
    var notes = $("qNotes").value.trim();
    if (notes) msg.push("Detalles: " + notes);
    var text = msg.join("\n");

    $("quoteMsg").textContent = text;
    $("quoteWa").href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
    $("quoteReady").hidden = false;
    $("quoteReady").scrollIntoView({ block: "nearest" });
  });

  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim() !== "") {
      e.target.setAttribute("aria-invalid", "false");
    }
  });

  $("quoteCopy").addEventListener("click", function () {
    var btn = this;
    var text = $("quoteMsg").textContent;
    function selectText() {
      var range = document.createRange();
      range.selectNodeContents($("quoteMsg"));
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      btn.textContent = "Texto seleccionado";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Copiado";
      }, selectText);
    } else {
      selectText();
    }
    setTimeout(function () { btn.textContent = "Copiar texto"; }, 2500);
  });
})();
