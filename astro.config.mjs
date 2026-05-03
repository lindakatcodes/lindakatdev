import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://lindakat.com",
  integrations: [mdx(), icon()],
  markdown: {
    syntaxHighlight: "prism",
  },
});
