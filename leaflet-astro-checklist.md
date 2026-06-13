# Leaflet → Astro Integration Checklist

Scope for v1: text, header, blockquote, horizontal rule, unordered/ordered lists,
image, website embed, bsky post embed. Skipping for now: poll, math, iframe, button.
Facets covered: bold, italic, strikethrough, code, link (basic markdown-equivalent
formatting only).

---

## 1. Lexicons (lex)

- [ ] Confirm `@atproto/lex` CLI is installed (`npm install -g @atproto/lex` if not)
- [ ] Run `lex install pub.leaflet.document`
  - This should pull in its dependencies too: `pub.leaflet.content`,
    `pub.leaflet.pages.linearDocument`, all `pub.leaflet.blocks.*`, and
    `pub.leaflet.richtext.facet`
- [ ] Run `lex build --out ./src/lexicons --import-ext ".ts"` (same output dir as
      your existing `site.ts`)
- [ ] **Inspect the generated output** — open `./src/lexicons` and find:
  - [ ] Where `pub.leaflet.content` / `pub.leaflet.pages.linearDocument` landed
  - [ ] Where `pub.leaflet.blocks.*` landed (text, header, blockquote,
        horizontalRule, unorderedList, orderedList, image, website, bskyPost)
  - [ ] Where `pub.leaflet.richtext.facet` landed
  - [ ] Confirm each generated block def exposes a `$matches(value)` helper
        (used like `blocks.text.main.$matches(innerBlock)` in Paul Frazee's example)
- [ ] **Note the exact import paths** somewhere — every block component below
      needs to import from these. Update the import lines marked `// TODO: verify path`
      once you know them.

---

## 2. Loader updates (`src/leaflet-loader.ts`)

- [ ] Keep `content: z.unknown()` in the schema — don't try to validate the
      block tree at load time (one bad block shouldn't fail the whole build)
- [ ] Import the new image-caching helper (built in section 3)
- [ ] Call the caching helper for each post **after** `parseData`, before
      `store.set`

```ts
// src/leaflet-loader.ts
import { cacheLeafletImages } from "./leaflet-images";

// ...inside the for (const post of filteredPosts) loop, after `data` is built:

await cacheLeafletImages(client, session.did, data);
// TODO: verify `session.did` is the correct property name on PasswordSession —
// it needs to be the DID of the account the records belong to (a DidString)

store.set({
  id,
  data,
});
```

- [ ] Run a build and confirm `session.did` resolves to a real DID string
      (log it once if unsure)

---

## 3. Image caching helper (new file: `src/leaflet-images.ts`)

- [ ] Create `src/leaflet-images.ts` with a blob-ref walker + downloader

```ts
// src/leaflet-images.ts
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import type { Client } from "@atproto/lex";

const OUTPUT_DIR = path.join(process.cwd(), "public", "leaflet-images");

const MIME_EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
};

type BlobRef = { $type?: "blob"; ref: { $link: string }; mimeType: string };

function isBlobRef(value: unknown): value is BlobRef {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.mimeType === "string" &&
    typeof v.ref === "object" &&
    v.ref !== null &&
    typeof (v.ref as Record<string, unknown>).$link === "string"
  );
}

/** Walk any nested object/array and yield every blob ref found */
export function* enumBlobRefs(value: unknown): Generator<BlobRef> {
  if (value === null || typeof value !== "object") return;

  if (isBlobRef(value)) {
    yield value;
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) yield* enumBlobRefs(item);
    return;
  }

  for (const v of Object.values(value as Record<string, unknown>)) {
    yield* enumBlobRefs(v);
  }
}

/** Download every blob ref in `data` (cover image, post images, link previews)
 * to public/leaflet-images/{cid}.{ext}, skipping ones already on disk. */
export async function cacheLeafletImages(
  client: Client,
  did: string,
  data: unknown,
) {
  await fsp.mkdir(OUTPUT_DIR, { recursive: true });

  for (const blobRef of enumBlobRefs(data)) {
    const cid = blobRef.ref.$link;
    const ext = MIME_EXT[blobRef.mimeType];
    if (!ext) {
      console.warn(
        `[leaflet-images] Unsupported mimetype, skipping: ${blobRef.mimeType}`,
      );
      continue;
    }

    const filePath = path.join(OUTPUT_DIR, `${cid}.${ext}`);
    if (await fsp.stat(filePath).catch(() => undefined)) continue;

    // TODO: verify getBlob signature/return shape against installed @atproto/lex version
    const res = await client.getBlob(did as any, cid as any);
    await fsp.writeFile(filePath, res.body as Uint8Array);
    console.log(`[leaflet-images] Cached ${cid}.${ext}`);
  }
}
```

- [ ] Run the loader once and confirm:
  - [ ] `client.getBlob(did, cid)` resolves without error
  - [ ] `res.body` is a `Uint8Array` (adjust to `res.payload.body` if the
        installed version's response shape differs — check whatever you get back
        by logging `res` once)
  - [ ] Files actually land in `public/leaflet-images/`

---

## 4. Rich text helper (new file: `src/lib/richtext.ts`)

This is the part adapted from Paul Frazee's / desertthunder's facet-applying
code, trimmed to the basics (bold, italic, strikethrough, code, link).

- [ ] Create `src/lib/richtext.ts`

```ts
// src/lib/richtext.ts

export type RichTextSegment = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  link?: string;
};

/** Facets use UTF-8 byte offsets; JS strings are UTF-16. Convert. */
function byteToCharIndex(str: string, byteIndex: number): number {
  let charIndex = 0;
  let byteCount = 0;

  while (byteCount < byteIndex && charIndex < str.length) {
    const code = str.charCodeAt(charIndex);
    byteCount += code < 0x80 ? 1 : code < 0x800 ? 2 : 3;
    charIndex++;
  }

  return charIndex;
}

/** Splits plaintext into segments based on facet ranges, each segment
 * carrying the formatting flags that apply to it. Assumes facets don't
 * deeply overlap in conflicting ways — fine for basic bold/italic/link/etc. */
export function buildRichTextSegments(
  text: string,
  facets: any[] = [],
): RichTextSegment[] {
  if (!facets.length) return [{ text }];

  const points = new Set<number>([0, text.length]);
  const ranges = facets.map((f) => {
    const start = byteToCharIndex(text, f.index.byteStart);
    const end = byteToCharIndex(text, f.index.byteEnd);
    points.add(start);
    points.add(end);
    return { start, end, features: f.features as any[] };
  });

  const sorted = [...points].sort((a, b) => a - b);
  const segments: RichTextSegment[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];
    const slice = text.slice(start, end);
    if (!slice) continue;

    const seg: RichTextSegment = { text: slice };

    for (const range of ranges) {
      if (range.start <= start && range.end >= end) {
        for (const feature of range.features) {
          switch (feature.$type) {
            case "pub.leaflet.richtext.facet#bold":
              seg.bold = true;
              break;
            case "pub.leaflet.richtext.facet#italic":
              seg.italic = true;
              break;
            case "pub.leaflet.richtext.facet#strikethrough":
              seg.strikethrough = true;
              break;
            case "pub.leaflet.richtext.facet#code":
              seg.code = true;
              break;
            case "pub.leaflet.richtext.facet#link":
              seg.link = feature.uri;
              break;
            // underline, highlight, mentions, footnote: intentionally
            // unhandled in v1 — add cases here later if needed
          }
        }
      }
    }

    segments.push(seg);
  }

  return segments;
}
```

- [ ] (Optional, later) add cases for underline/highlight/mentions/footnote if
      you end up using them in posts

---

## 5. `RichText.astro` (new file: `src/components/leaflet/RichText.astro`)

- [ ] Create the component

```astro
---
import { buildRichTextSegments } from "../../lib/richtext";

interface Props {
  text: string;
  facets?: any[];
}

const { text, facets = [] } = Astro.props;

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const html = buildRichTextSegments(text, facets)
  .map((seg) => {
    let out = escapeHtml(seg.text);
    if (seg.code) out = `<code>${out}</code>`;
    if (seg.bold) out = `<strong>${out}</strong>`;
    if (seg.italic) out = `<em>${out}</em>`;
    if (seg.strikethrough) out = `<s>${out}</s>`;
    if (seg.link) {
      out = `<a href="${escapeHtml(seg.link)}" target="_blank" rel="noopener noreferrer">${out}</a>`;
    }
    return out;
  })
  .join("");
---
<Fragment set:html={html} />
```

---

## 6. Block components (`src/components/leaflet/`)

All of these import block defs from your generated `pub.leaflet.blocks` module —
fix the import path once you know it from section 1.

- [ ] `TextBlock.astro`

```astro
---
import RichText from "./RichText.astro";
interface Props { block: any } // pub.leaflet.blocks.text Main
const { block } = Astro.props;
---
<p><RichText text={block.plaintext} facets={block.facets ?? []} /></p>
```

- [ ] `HeaderBlock.astro` — **remember the +1 offset** (post title = h1, so
      Leaflet level 1 → `<h2>`, etc.)

```astro
---
import RichText from "./RichText.astro";
interface Props { block: any } // pub.leaflet.blocks.header Main
const { block } = Astro.props;
const level = Math.min((block.level ?? 1) + 1, 6);
const Tag = `h${level}`;
---
<Tag><RichText text={block.plaintext} facets={block.facets ?? []} /></Tag>
```

- [ ] `BlockquoteBlock.astro`

```astro
---
import RichText from "./RichText.astro";
interface Props { block: any }
const { block } = Astro.props;
---
<blockquote><RichText text={block.plaintext} facets={block.facets ?? []} /></blockquote>
```

- [ ] `ImageBlock.astro`

```astro
---
interface Props { block: any } // pub.leaflet.blocks.image Main
const { block } = Astro.props;

const MIME_EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
};

const cid = block.image.ref.$link;
const ext = MIME_EXT[block.image.mimeType] ?? "jpg";
const src = `/leaflet-images/${cid}.${ext}`;
---
<img src={src} alt={block.alt ?? ""} loading="lazy" />
```

- [ ] `ListItem.astro` (shared by ordered + unordered, recursive for nesting)

```astro
---
import RichText from "./RichText.astro";
import ImageBlock from "./ImageBlock.astro";

interface Props {
  item: any; // ListItem
  ordered: boolean;
}
const { item, ordered } = Astro.props;
const content = item.content;
---
<li>
  {content?.$type === "pub.leaflet.blocks.text" && (
    <RichText text={content.plaintext} facets={content.facets ?? []} />
  )}
  {content?.$type === "pub.leaflet.blocks.header" && (
    <strong><RichText text={content.plaintext} facets={content.facets ?? []} /></strong>
  )}
  {content?.$type === "pub.leaflet.blocks.image" && <ImageBlock block={content} />}

  {item.children?.length > 0 && (
    ordered ? (
      <ol>{item.children.map((child: any) => <Astro.self item={child} ordered={ordered} />)}</ol>
    ) : (
      <ul>{item.children.map((child: any) => <Astro.self item={child} ordered={ordered} />)}</ul>
    )
  )}
</li>
```

- [ ] `UnorderedListBlock.astro`

```astro
---
import ListItem from "./ListItem.astro";
interface Props { block: any }
const { block } = Astro.props;
---
<ul>
  {block.children?.map((item: any) => <ListItem item={item} ordered={false} />)}
</ul>
```

- [ ] `OrderedListBlock.astro`

```astro
---
import ListItem from "./ListItem.astro";
interface Props { block: any }
const { block } = Astro.props;
---
<ol start={block.startIndex ?? 1}>
  {block.children?.map((item: any) => <ListItem item={item} ordered={true} />)}
</ol>
```

- [ ] `WebsiteBlock.astro`

```astro
---
interface Props { block: any }
const { block } = Astro.props;

const MIME_EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
};

let thumb: string | null = null;
if (block.previewImage) {
  const cid = block.previewImage.ref.$link;
  const ext = MIME_EXT[block.previewImage.mimeType] ?? "jpg";
  thumb = `/leaflet-images/${cid}.${ext}`;
}
---
<a class="website-embed-card" href={block.src} target="_blank" rel="noopener noreferrer">
  {thumb && <img src={thumb} alt="" />}
  <div>
    {block.title && <span class="title">{block.title}</span>}
    {block.description && <span class="desc">{block.description}</span>}
    <span class="url">{block.src}</span>
  </div>
</a>
```

- [ ] `BskyPostBlock.astro`

```astro
---
interface Props { block: any } // pub.leaflet.blocks.bskyPost Main
const { block } = Astro.props;

const uriParts = block.postRef.uri.split("/");
const did = uriParts[2];
const rkey = uriParts[uriParts.length - 1];
const host = block.clientHost ?? "https://bsky.app";
const url = `${host}/profile/${did}/post/${rkey}`;
---
<div class="bsky-embed-card">
  <span>🦋 Bluesky Post</span>
  <a href={url} target="_blank" rel="noopener noreferrer">View on Bluesky →</a>
</div>
```

---

## 7. `LeafletRenderer.astro` (top-level)

- [ ] Create `src/components/leaflet/LeafletRenderer.astro`

```astro
---
// TODO: verify these import paths against your `lex build` output
import * as blocks from "../../lexicons/pub/leaflet/blocks";

import TextBlock from "./TextBlock.astro";
import HeaderBlock from "./HeaderBlock.astro";
import BlockquoteBlock from "./BlockquoteBlock.astro";
import UnorderedListBlock from "./UnorderedListBlock.astro";
import OrderedListBlock from "./OrderedListBlock.astro";
import ImageBlock from "./ImageBlock.astro";
import WebsiteBlock from "./WebsiteBlock.astro";
import BskyPostBlock from "./BskyPostBlock.astro";

interface Props {
  blocks: any[]; // BlockWrapper[] from content.pages[0].blocks
}

const { blocks: blockList } = Astro.props;

const items = blockList.map((wrapper) => {
  const inner = wrapper.block;

  if (blocks.text.main.$matches(inner)) return { Component: TextBlock, props: { block: inner } };
  if (blocks.header.main.$matches(inner)) return { Component: HeaderBlock, props: { block: inner } };
  if (blocks.blockquote.main.$matches(inner)) return { Component: BlockquoteBlock, props: { block: inner } };
  if (blocks.horizontalRule.main.$matches(inner)) return { Component: "hr", props: {} };
  if (blocks.unorderedList.main.$matches(inner)) return { Component: UnorderedListBlock, props: { block: inner } };
  if (blocks.orderedList.main.$matches(inner)) return { Component: OrderedListBlock, props: { block: inner } };
  if (blocks.image.main.$matches(inner)) return { Component: ImageBlock, props: { block: inner } };
  if (blocks.website.main.$matches(inner)) return { Component: WebsiteBlock, props: { block: inner } };
  if (blocks.bskyPost.main.$matches(inner)) return { Component: BskyPostBlock, props: { block: inner } };

  // poll / math / iframe / button / page / unknown -> skip in v1
  console.warn(`[leaflet] Unhandled block type: ${inner.$type}`);
  return null;
});
---
<div class="leaflet-content prose dark:prose-invert max-w-none">
  {items.map((item) => item && <item.Component {...item.props} />)}
</div>
```

---

## 8. Wire it into your post page

- [ ] In your blog post template (e.g. `src/pages/blog/[...slug].astro`):

```astro
---
import LeafletRenderer from "../../components/leaflet/LeafletRenderer.astro";

const { entry } = Astro.props; // or however you're getting the collection entry
const pages = entry.data.content?.pages ?? [];
const firstPageBlocks = pages[0]?.blocks ?? [];
---
<LeafletRenderer blocks={firstPageBlocks} />
```

---

## 9. Final smoke test

- [ ] Run `astro build` (or dev server) and confirm:
  - [ ] Loader fetches and filters posts without errors
  - [ ] `public/leaflet-images/` is populated with cover/inline images
  - [ ] A post with bold/italic/link/strikethrough text renders correctly
  - [ ] A post with a list, an image block, and (if you have one) a website
        or bsky embed renders without console warnings
  - [ ] Any block type you don't yet support logs a clear
        `[leaflet] Unhandled block type: ...` warning instead of crashing the build
