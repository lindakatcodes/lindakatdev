/**
 * Publishes a local blog post to ATProto as a site.standard.document record.
 *
 * Usage: npx tsx scripts/publish-post.ts src/content/blog/my-post.md
 *
 * Reads AT_HANDLE and AT_PASSWORD from .env (use a Bluesky App Password, not your main password).
 * On success, writes the returned atUri back into the file's frontmatter.
 */

import { AtpAgent } from "@atproto/api";
import { readFileSync, writeFileSync } from "fs";
import { load as parseYaml, dump as dumpYaml } from "js-yaml";
import { resolve } from "path";

const PUBLICATION_URI =
  "at://did:plc:ci6ypujbbnk3ae7cm74ga3kr/site.standard.publication/3mno2tztk3s2x";
const PDS_SERVICE = "https://bsky.social";

// --- helpers ---

function loadEnv() {
  try {
    const env = readFileSync(".env", "utf-8");
    for (const line of env.split("\n")) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {
    // .env not found; fall through to existing process.env
  }
}

function parseFrontmatter(source: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error("No YAML frontmatter found in file.");
  return {
    data: (parseYaml(match[1]) as Record<string, unknown>) ?? {},
    content: match[2],
  };
}

function stringifyFrontmatter(
  data: Record<string, unknown>,
  content: string,
): string {
  return `---\n${dumpYaml(data, { lineWidth: -1 })}---\n${content}`;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// --- main ---

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npx tsx scripts/publish-post.ts <path-to-post>");
    process.exit(1);
  }

  loadEnv();

  const handle = process.env.AT_HANDLE;
  const password = process.env.AT_PASSWORD;
  if (!handle || !password) {
    console.error("AT_HANDLE and AT_PASSWORD must be set in .env");
    process.exit(1);
  }

  const absPath = resolve(filePath);
  const source = readFileSync(absPath, "utf-8");
  const { data, content } = parseFrontmatter(source);

  if (data.atUri) {
    console.log(`Post already published: ${data.atUri}`);
    console.log("Remove the atUri from frontmatter to republish.");
    process.exit(0);
  }

  const title = data.title as string;
  const slug = data.slug as string;
  const description = data.description as string | undefined;
  const tags = data.tags as string[] | undefined;
  const publishedDate = data.publishedDate as Date | string;

  if (!title || !slug) {
    console.error("Post must have title and slug in frontmatter.");
    process.exit(1);
  }

  const agent = new AtpAgent({ service: PDS_SERVICE });
  await agent.login({ identifier: handle, password });
  console.log(`Logged in as ${agent.session?.handle}`);

  const record = {
    $type: "site.standard.document",
    site: PUBLICATION_URI,
    path: `/blog/${slug}`,
    title,
    publishedAt: new Date(publishedDate as string).toISOString(),
    ...(description ? { description } : {}),
    ...(tags && tags.length > 0 ? { tags } : {}),
    textContent: stripMarkdown(content),
  };

  const result = await agent.com.atproto.repo.createRecord({
    repo: agent.session!.did,
    collection: "site.standard.document",
    record,
  });

  console.log(`Published! AT URI: ${result.data.uri}`);

  data.atUri = result.data.uri;
  writeFileSync(absPath, stringifyFrontmatter(data, content), "utf-8");
  console.log(`Wrote atUri back to ${filePath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
