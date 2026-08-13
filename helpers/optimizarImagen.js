export const optimizarImagenCloudinary = (url, ancho = 400) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  return url.replace("/upload/", `/upload/f_auto,q_auto:eco,w_${ancho}/`);
};
