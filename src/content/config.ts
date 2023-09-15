import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      headerImage: image(),
      headerImageAlt: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      featured: z.boolean(),
      demoLink: z.string().url().optional(),
      codeLink: z.string().url().optional(),
      liveLink: z.string().url().optional(),
      hasCaseStudy: z.boolean(),
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
});

export const collections = {
  projects: projectsCollection,
};
