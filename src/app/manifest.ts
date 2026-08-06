import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio Cora",
    short_name: "Studio Cora",
    description:
      "Estúdio criativo especializado em branding, gestão de redes sociais, identidade visual e desenvolvimento digital.",

    start_url: "/",

    display: "standalone",

    background_color: "#050514",

    theme_color: "#3D3DFF",

    lang: "pt-BR",

    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}