import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
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
    }),
});

export const collections = {
  projects: projectsCollection,
};
