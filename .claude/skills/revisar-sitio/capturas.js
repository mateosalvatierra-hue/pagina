// Abre index.html en Chromium, toma capturas en celular y escritorio
// y reporta errores de JavaScript y enlaces internos rotos.
// Uso: node .claude/skills/revisar-sitio/capturas.js [carpeta-de-salida]
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "../../..");
const out = path.resolve(process.argv[2] || path.join(root, "capturas"));
fs.mkdirSync(out, { recursive: true });

const vistas = [
  { nombre: "celular", width: 390, height: 844 },
  { nombre: "escritorio", width: 1366, height: 900 },
];

(async () => {
  const browser = await chromium.launch();
  const errores = [];
  for (const v of vistas) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    page.on("pageerror", (e) => errores.push(`[${v.nombre}] Error JS: ${e.message}`));
    page.on("console", (m) => { if (m.type() === "error") errores.push(`[${v.nombre}] Consola: ${m.text()}`); });
    await page.goto("file://" + path.join(root, "index.html"));
    await page.waitForTimeout(800);
    const file = path.join(out, `${v.nombre}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log("Captura:", file);

    if (v.nombre === "celular") {
      const desborde = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (desborde > 0) errores.push(`[celular] La página se desborda ${desborde}px a lo ancho (scroll horizontal).`);
    }
    const rotos = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h.length > 1 && !document.getElementById(h.slice(1)))
    );
    for (const h of new Set(rotos)) errores.push(`[${v.nombre}] Enlace interno sin destino: ${h}`);
    await page.close();
  }
  await browser.close();
  console.log(errores.length ? "\nProblemas:\n- " + [...new Set(errores)].join("\n- ") : "\nSin errores detectados.");
})();
