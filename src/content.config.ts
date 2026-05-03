import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const praisesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/praises" }),
  schema: () =>
    z.object({
      quote: z.string(),
      name: z.string(),
      title: z.string(),
      srcLink: z.string(),
      order: z.number(),
    }),
});

const valuesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/values" }),
  schema: () =>
    z.object({
      order: z.number(),
      value: z.string(),
      iconColor: z.string(),
      iconName: z.string(),
      details: z.string(),
      quote: z.string(),
      quoteRef: z.string(),
    }),
});

export const collections = {
  praises: praisesCollection,
  values: valuesCollection,
};
