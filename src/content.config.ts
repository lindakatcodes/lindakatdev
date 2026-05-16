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

const projectsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image(),
      imageAlt: z.string(),
      about: z.string(),
      tech: z.array(z.string()),
      featured: z.boolean(),
      lastPublishDate: z.string(),
      codeLink: z.string().url().nullable(),
      liveLink: z.string().url().nullable(),
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
  projects: projectsCollection,
  values: valuesCollection,
};
