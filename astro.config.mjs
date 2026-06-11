import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://lindakat.com",
  integrations: [mdx(), icon()],
  markdown: {
    syntaxHighlight: "prism",
  },
  env: {
    schema: {
      AT_HANDLE: envField.string({ context: "server", access: "public" }),
      AT_PASSWORD: envField.string({ context: "server", access: "secret" }),
    },
  },
});
