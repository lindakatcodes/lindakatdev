import { z, defineCollection } from "astro:content";
import type { SchemaContext } from "astro:content";
import { glob } from "astro/loaders";

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    imageAlt: z.string(),
  });

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.date(),
      ogImage: image(),
      tags: z.array(z.string()),
      featured: z.boolean(),
      status: z.enum(["Live", "Draft"]),
      remoteLink: z.string().url().optional(),
      remoteSrc: z.string().optional(),
    }),
});

const notesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      dateUpdated: z.date(),
      tags: z.array(z.string()),
      status: z.enum(["Live", "Draft"]),
      source: z.string().optional(),
    }),
});

const projectsCollection = defineCollection({
  loader: glob({
    pattern: "**/!(_*).{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      hasCaseStudy: z.boolean(),
      name: z.string(),
      headerImage: imageSchema({ image }),
      description: z.string(),
      tech: z.array(z.string()),
      featured: z.boolean(),
      order: z.number(),
      demoLink: z.string().url().nullable(),
      codeLink: z.string().url().nullable(),
      liveLink: z.string().url().nullable(),
    }),
});

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
      title: z.string(),
      iconColor: z.string(),
      iconName: z.string(),
      details: z.string(),
      quote: z.string(),
      quoteRef: z.string(),
      blogPath: z.string(),
      blogTitle: z.string(),
      caseStudy: z.object({
        title: z.string(),
        challenge: z.string(),
        approach: z.string(),
        result: z.string(),
      }),
    }),
});

export const collections = {
  blog: blogCollection,
  notes: notesCollection,
  praises: praisesCollection,
  projects: projectsCollection,
  values: valuesCollection,
};
