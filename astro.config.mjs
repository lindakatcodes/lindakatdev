import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/util/remarkReadingTime.mjs";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://lindakat.com",
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkReadingTime],
  },
  redirects: {
    "/notes/": "https://notes.lindakat.com",
  },
});