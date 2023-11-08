import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/util/remarkReadingTime.mjs";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://lindakat.com",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "rose-pine-moon",
      wrap: true,
    },
    remarkPlugins: [remarkReadingTime],
  },
});