// generar-banner-responsive.mjs
// Genera 3 versiones responsivas de public/banner.webp
// Correr una sola vez desde la raíz del proyecto: node generar-banner-responsive.mjs

import sharp from "sharp";
import path from "path";

const origen = path.resolve("public/banner.webp");

const tamaños = [
  { ancho: 640, salida: "public/banner-640.webp" },   // mobile
  { ancho: 1080, salida: "public/banner-1080.webp" }, // tablet / mobile grande
  { ancho: 1920, salida: "public/banner-1920.webp" },  // desktop
];

const generar = async () => {
  for (const { ancho, salida } of tamaños) {
    await sharp(origen)
      .resize({ width: ancho })
      .webp({ quality: 75 })
      .toFile(path.resolve(salida));
    console.log(`✔ Generado ${salida} (${ancho}px de ancho)`);
  }
};

generar().catch((err) => {
  console.error("Error generando el banner responsivo:", err);
  process.exit(1);
});
