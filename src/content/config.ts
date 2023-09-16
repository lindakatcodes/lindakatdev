import { z, defineCollection } from "astro:content";

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
  projects: projectsCollection,
};
