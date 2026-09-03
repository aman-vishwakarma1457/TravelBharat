import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "TravelBharat — Explore India state by state through destinations, culture, heritage, nature and adventure.";

const DEFAULT_OG_DESCRIPTION =
  "Explore Indian states, union territories, cities and destinations with TravelBharat.";

function upsertMeta(selector, attributes, content) {
  if (!content) return;

  let meta = document.head.querySelector(selector);

  if (!meta) {
    meta = document.createElement("meta");

    Object.entries(attributes).forEach(([key, value]) => {
      meta.setAttribute(key, value);
    });

    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function upsertCanonical(url) {
  let canonical = document.head.querySelector(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}

export default function SEO({
  title = "",
  description = "",
  image = "",
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | TravelBharat`
      : "TravelBharat – Explore India State by State";

    const currentUrl =
      window.location.origin +
      window.location.pathname +
      window.location.search;

    const metaDescription =
      description || DEFAULT_DESCRIPTION;

    const ogDescription =
      description || DEFAULT_OG_DESCRIPTION;

    // Page title
    document.title = fullTitle;

    // Standard SEO description
    upsertMeta(
      'meta[name="description"]',
      {
        name: "description",
      },
      metaDescription
    );

    // Open Graph
    upsertMeta(
      'meta[property="og:title"]',
      {
        property: "og:title",
      },
      fullTitle
    );

    upsertMeta(
      'meta[property="og:description"]',
      {
        property: "og:description",
      },
      ogDescription
    );

    upsertMeta(
      'meta[property="og:type"]',
      {
        property: "og:type",
      },
      "website"
    );

    upsertMeta(
      'meta[property="og:url"]',
      {
        property: "og:url",
      },
      currentUrl
    );

    if (image) {
      upsertMeta(
        'meta[property="og:image"]',
        {
          property: "og:image",
        },
        image
      );
    }

    // Twitter / X
    upsertMeta(
      'meta[name="twitter:card"]',
      {
        name: "twitter:card",
      },
      "summary_large_image"
    );

    upsertMeta(
      'meta[name="twitter:title"]',
      {
        name: "twitter:title",
      },
      fullTitle
    );

    upsertMeta(
      'meta[name="twitter:description"]',
      {
        name: "twitter:description",
      },
      metaDescription
    );

    if (image) {
      upsertMeta(
        'meta[name="twitter:image"]',
        {
          name: "twitter:image",
        },
        image
      );
    }

    // Canonical URL
    upsertCanonical(currentUrl);

    // Scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [title, description, image]);

  return null;
}