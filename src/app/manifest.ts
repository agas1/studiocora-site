import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio Cora",
    short_name: "Studio Cora",
    description:
      "Estúdio criativo especializado em branding, gestão de redes sociais, identidade visual e desenvolvimento digital.",

    start_url: "/",

    display: "standalone",

    background_color: "#0A0A0A",

    theme_color: "#6966F0",

    lang: "pt-BR",

    icons: [
      {
        src: "/icon.png",
        sizes: "200x200",
        type: "image/png",
      },
    ],
  };
}
