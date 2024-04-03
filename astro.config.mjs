import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/util/remarkReadingTime.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://lindakat.com",
  integrations: [
    mdx(),
    icon({
      svgoOptions: {
        plugins: [],
      },
    }),
  ],
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkReadingTime],
  },
});
