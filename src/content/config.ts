import { z, defineCollection } from "astro:content";
import type { SchemaContext } from "astro:content";

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    imageAlt: z.string(),
  });

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.date(),
      ogImage: image(),
      tags: z.array(z.string()),
      featured: z.boolean(),
      status: z.enum(["Live", "Draft", "Garden"]),
      remoteLink: z.string().url().optional(),
      remoteSrc: z.string().optional(),
    }),
});

const notesCollection = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      dateUpdated: z.date(),
      tags: z.array(z.string()),
      status: z.enum(["Live", "Draft", "Garden"]),
      source: z.string().optional(),
    }),
});

const projectsCollection = defineCollection({
  type: "content",
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
  type: "data",
  schema: () =>
    z.object({
      quote: z.string(),
      name: z.string(),
      title: z.string(),
      srcLink: z.string(),
      order: z.number(),
    }),
});

export const collections = {
  blog: blogCollection,
  notes: notesCollection,
  praises: praisesCollection,
  projects: projectsCollection,
};
