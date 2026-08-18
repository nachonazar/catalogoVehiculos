import sharp from "sharp";
import path from "path";

const origen = path.resolve("public/banner.webp");

const tamaños = [
  { ancho: 640, salida: "public/banner-640.webp" },
  { ancho: 1080, salida: "public/banner-1080.webp" },
  { ancho: 1920, salida: "public/banner-1920.webp" },
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
