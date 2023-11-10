import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      published: z.boolean(),
      tags: z.array(z.string()),
      date: z.string().datetime(),
      ogImage: image(),
      featured: z.boolean(),
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

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
