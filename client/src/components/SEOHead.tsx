import { useEffect } from "react";
import { SITE_CONFIG } from "@/data/config";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object | object[];
}

export default function SEOHead({ title, description, canonical, ogImage, ogType = "website", jsonLd }: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title.includes(SITE_CONFIG.title) ? title : `${title} | ${SITE_CONFIG.title}`;

    // Update or create meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("author", SITE_CONFIG.editorialName);
    setMeta("robots", "index, follow, max-image-preview:large");

    // OG tags
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", SITE_CONFIG.title, true);
    if (canonical) setMeta("og:url", canonical, true);
    if (ogImage) setMeta("og:image", ogImage, true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (ogImage) setMeta("twitter:image", ogImage);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // JSON-LD
    if (jsonLd) {
      // Remove old JSON-LD scripts (except the ones in index.html)
      document.querySelectorAll('script[data-dynamic-jsonld]').forEach(el => el.remove());
      
      const scripts = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      scripts.forEach(data => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-dynamic-jsonld", "true");
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.querySelectorAll('script[data-dynamic-jsonld]').forEach(el => el.remove());
    };
  }, [title, description, canonical, ogImage, ogType, jsonLd]);

  return null;
}
