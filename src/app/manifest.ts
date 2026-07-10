import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Solace Skin",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FBF8F3",
    theme_color: "#8A9A82",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
