// 1. Import the `Loader` type and any other dependencies needed
import type { Loader } from "astro/loaders";
import { z } from "astro/zod";
import { Client } from "@atproto/lex";
import { PasswordSession } from "@atproto/lex-password-session";
import { AT_HANDLE, AT_PASSWORD } from "astro:env/server";
import * as site from "./lexicons/site.ts";

const session = await PasswordSession.login({
  service: "https://bsky.social",
  identifier: AT_HANDLE,
  password: AT_PASSWORD,
});

// 2. Define any options that your loader needs
export function leafletLoader() {
  // 3. Return a loader object
  return {
    name: "feed-loader",
    load: async ({ store, parseData }) => {
      const client = new Client(session);

      const allDocs = await client.list(site.standard.document);

      const filteredPosts = allDocs.records.filter(
        (record) =>
          record.value.site ===
          "at://did:plc:ci6ypujbbnk3ae7cm74ga3kr/site.standard.publication/3mno2tztk3s2x",
      );

      store.clear();

      for (const post of filteredPosts) {
        const id = post.cid;
        const data = await parseData({
          id,
          data: JSON.parse(
            JSON.stringify(post.value, (k, v) => {
              // ATProto CIDs automatically serialize to {"/": "..."} during stringify.
              // We just map that "/" value to the "$link" key your Zod schema expects.
              if (k === "ref" && v?.["/"]) return { $link: v["/"] };
              return v;
            }),
          ),
        });

        store.set({
          id,
          data,
        });
      }
    },
    // 4. Define the schema of an entry.
    schema: z.object({
      $type: z.literal("site.standard.document").optional(),
      site: z.string(),
      title: z.string(),
      publishedAt: z.string().datetime(),
      path: z.string().optional(),
      content: z.unknown(),
      tags: z.array(z.string()).optional(),
      coverImage: z
        .object({
          $type: z.literal("blob").optional(),
          ref: z.object({
            $link: z.string(),
          }),
          mimeType: z.string(),
          size: z.number().max(1000000),
        })
        .optional(),
      description: z.string().optional(),
      textContent: z.string().optional(),
    }),
  } satisfies Loader;
}

// if (post.data.content?.$type === 'site.standard.content.markdown') {
//   const markdown = post.data.content.text;
// }
