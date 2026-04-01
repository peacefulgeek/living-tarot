#!/usr/bin/env node
/**
 * generate-articles.mjs — Auto-generate new tarot articles
 * ALL secrets from process.env. NEVER hardcode API keys.
 * Bunny CDN credentials are the only exception (in code per spec).
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = resolve(__dirname, "..", "client", "src", "data", "articles.json");

// Bunny CDN credentials (in code per spec)
const BUNNY_STORAGE_KEY = "5c3e1087-a3d7-4dd7-abf23f446fda-3227-4fe6";
const BUNNY_STORAGE_ZONE = "living-tarot";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const CDN_BASE = "https://living-tarot.b-cdn.net";

// API keys from environment
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const FAL_KEY = process.env.FAL_KEY;
const GH_PAT = process.env.GH_PAT;

const CATEGORIES = [
  { slug: "the-major-arcana", name: "The Major Arcana" },
  { slug: "the-minor-arcana", name: "The Minor Arcana" },
  { slug: "the-spreads", name: "The Spreads" },
  { slug: "the-practice", name: "The Practice" },
  { slug: "the-inner-work", name: "The Inner Work" },
];

const VOICE_PHRASES = [
  "The space between knowing something intellectually and knowing it in your body is where all the real work happens.",
  "Awareness doesn't need to be cultivated. It needs to be uncovered.",
  "The mind is not the enemy. The identification with it is.",
  "What you resist doesn't just persist — it drives.",
  "Healing isn't about becoming someone new. It's about unbecoming everything that isn't you.",
  "The question isn't whether you're spiritual enough. The question is whether you're honest enough.",
  "Stillness isn't the absence of movement. It's the presence of attention.",
  "You don't find peace by rearranging circumstances. You find it by seeing through the one who needs rearranging.",
  "The body keeps the score, but awareness reads the whole book.",
  "Freedom isn't the absence of conditioning. It's the recognition of it.",
];

function httpsRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, data }));
    });
    req.on("error", reject);
    req.setTimeout(120000, () => { req.destroy(); reject(new Error("Timeout")); });
    if (body) req.write(body);
    req.end();
  });
}

async function generateArticleContent(topic, category) {
  if (!ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY not set");
  }

  const phrase = VOICE_PHRASES[Math.floor(Math.random() * VOICE_PHRASES.length)];
  
  const prompt = `Write a 2,500-2,800 word article about "${topic}" for a tarot wisdom website.
Category: ${category}
Voice: Contemplative, direct, grounded. Like a consciousness teacher who respects the reader's intelligence.
Include: 3-5 internal link placeholders as [INTERNAL:category/slug], one external authority link (nofollow), 
first-person lived experience, at least one named reference (Carl Jung, Rachel Pollack, Robert Place, etc.).
Include this phrase naturally: "${phrase}"
Format as clean HTML with h2, h3, p, ul/li tags. Include 2-5 FAQ items at the end under a unique H2.
Do NOT start with "You". Vary the opener style.`;

  const body = JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const resp = await httpsRequest("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
  }, body);

  if (resp.status !== 200) {
    throw new Error(`Anthropic API error: ${resp.status} ${resp.data.substring(0, 200)}`);
  }

  const result = JSON.parse(resp.data);
  return result.content[0].text;
}

async function generateImage(prompt) {
  if (!FAL_KEY) {
    console.warn("FAL_KEY not set, using default image");
    return `${CDN_BASE}/images/hero/default-tarot.webp`;
  }

  const body = JSON.stringify({
    prompt,
    image_size: "landscape_16_9",
    num_images: 1,
  });

  const resp = await httpsRequest("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${FAL_KEY}`,
    },
  }, body);

  if (resp.status !== 200) {
    throw new Error(`FAL API error: ${resp.status}`);
  }

  const result = JSON.parse(resp.data);
  return result.images?.[0]?.url || `${CDN_BASE}/images/hero/default-tarot.webp`;
}

async function uploadToBunny(path, data, contentType) {
  const resp = await httpsRequest(
    `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}${path}`,
    {
      method: "PUT",
      headers: {
        AccessKey: BUNNY_STORAGE_KEY,
        "Content-Type": contentType,
        "Content-Length": Buffer.byteLength(data),
      },
    },
    data
  );
  return resp.status === 201;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

export async function generateNewArticles(count = 5, options = {}) {
  const isProductSpotlight = options.type === "product-spotlight";
  console.log(`[auto-gen] Generating ${count} ${isProductSpotlight ? 'product spotlight' : 'regular'} articles...`);

  const articles = JSON.parse(readFileSync(ARTICLES_PATH, "utf-8"));
  const maxId = Math.max(...articles.map((a) => a.id));
  const existingSlugs = new Set(articles.map((a) => a.slug));

  const regularTopics = [
    "The Hermit's Lantern: Finding Your Own Light in Darkness",
    "Reading Reversals: When Cards Speak in Whispers",
    "The Celtic Cross Revisited: A Modern Practitioner's Guide",
    "Shadow Work with the Tower Card",
    "Elemental Dignities: How Cards Speak to Each Other",
    "The Empress and Embodied Creativity",
    "Tarot and Dream Work: Bridging Two Symbol Systems",
    "The Knight of Cups: Emotional Intelligence in Action",
    "Building a Daily Card Practice That Actually Sticks",
    "The High Priestess and the Art of Not-Knowing",
  ];

  const productTopics = [
    "The Best Tarot Journals for Deepening Your Practice",
    "Meditation Tools Every Tarot Reader Should Consider",
    "Building a Sacred Reading Space: Essential Tools",
    "Tarot Decks for the Serious Student: A Curated Guide",
    "Books That Transform How You Read Tarot",
  ];

  const topics = isProductSpotlight ? productTopics : regularTopics;

  let generated = 0;
  for (let i = 0; i < count && i < topics.length; i++) {
    const topic = topics[i];
    const slug = slugify(topic);

    if (existingSlugs.has(slug)) {
      console.log(`[auto-gen] Skipping duplicate: ${slug}`);
      continue;
    }

    try {
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const content = await generateArticleContent(topic, category.name);
      
      const imagePrompt = `Luminous warm watercolor illustration of ${topic.toLowerCase()}, tarot cards, mystical atmosphere, gold leaf accents, sacred geometry, healing light, no text, no dark environments`;
      const imageUrl = await generateImage(imagePrompt);

      const newArticle = {
        id: maxId + 1 + generated,
        title: topic,
        slug,
        category: category.slug,
        categoryName: category.name,
        dateISO: new Date().toISOString(),
        content,
        heroImage: imageUrl,
        ogImage: imageUrl,
        wordCount: content.split(/\s+/).length,
        readingTime: Math.ceil(content.split(/\s+/).length / 250),
        metaDescription: topic,
        faqCount: 3,
        backlinkType: "internal",
        openerType: "scene-setting",
        conclusionType: "challenge",
      };

      articles.push(newArticle);
      existingSlugs.add(slug);
      generated++;
      console.log(`[auto-gen] Generated: ${topic}`);
    } catch (err) {
      console.error(`[auto-gen] Failed: ${topic}`, err.message);
    }
  }

  if (generated > 0) {
    writeFileSync(ARTICLES_PATH, JSON.stringify(articles), "utf-8");
    console.log(`[auto-gen] Saved ${generated} new articles. Total: ${articles.length}`);
  }

  return generated;
}

// Run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateNewArticles(5).then((count) => {
    console.log(`[auto-gen] Complete. Generated ${count} articles.`);
    process.exit(0);
  }).catch((err) => {
    console.error("[auto-gen] Fatal:", err);
    process.exit(1);
  });
}
