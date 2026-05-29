import { logos } from "./assets";

export const site = {
  baseUrl: "https://www.maoyamakeupformation.com",
  logo: logos.main,
  phone: "0359518771",
  email: "maoya.lille@gmail.com",
  address: "4 Rue de l'Égalité, 59160 Lille, France",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=4+Rue+de+l%27%C3%89galit%C3%A9,+59160+Lille,+France",
};

const fallbackSvg = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">' +
    "<defs>" +
      '<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">' +
        '<stop offset="0" stop-color="#f7ecef"/>' +
        '<stop offset="1" stop-color="#8f6870"/>' +
      "</linearGradient>" +
    "</defs>" +
    '<rect width="900" height="1100" rx="34" fill="url(#g)"/>' +
    '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="54" fill="#4b0f34">Maoya</text>' +
  "</svg>"
);

export const fallbackImage = "data:image/svg+xml;charset=UTF-8," + fallbackSvg;
