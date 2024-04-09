import { z, defineCollection } from "astro:content";

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
  type: "data",
  schema: ({ image }) =>
    z.discriminatedUnion("hasCaseStudy", [
      z.object({
        hasCaseStudy: z.literal(false),
        name: z.string(),
        headerImage: image(),
        headerImageAlt: z.string(),
        description: z.string(),
        tech: z.array(z.string()),
        featured: z.boolean(),
        order: z.number(),
        demoLink: z.string().url().nullable(),
        codeLink: z.string().url().nullable(),
        liveLink: z.string().url().nullable(),
      }),
      z.object({
        hasCaseStudy: z.literal(true),
        name: z.string(),
        headerImage: image(),
        headerImageAlt: z.string(),
        description: z.string(),
        tech: z.array(z.string()),
        featured: z.boolean(),
        order: z.number(),
        demoLink: z.string().url().nullable(),
        codeLink: z.string().url().nullable(),
        liveLink: z.string().url().nullable(),
        purpose: z.string(),
        highlights: z.array(z.string()),
        challenges: z.array(z.string()),
        detailImage1: image(),
        detailImage1Alt: z.string(),
        detailImage2: image(),
        detailImage2Alt: z.string(),
        lessonIntro: z.string(),
        lessonWins: z.array(z.string()),
        lessonImprovements: z.array(z.string()).optional(),
      }),
    ]),
});

const praisesCollection = defineCollection({
  type: "data",
  schema: () =>
    z.object({
      quote: z.array(z.string()),
      name: z.string(),
      srcLink: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
  notes: notesCollection,
  praises: praisesCollection,
  projects: projectsCollection,
};
