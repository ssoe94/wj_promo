import { useEffect } from "react";

const SITE_URL = "https://wanjia-precision.com";

const upsertMeta = (selector, attributes) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
};

const upsertLink = (selector, attributes) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("link");
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
};

export const usePageMetadata = (meta = {}, langCode = "en") => {
  useEffect(() => {
    document.documentElement.lang = langCode || "en";
  }, [langCode]);

  useEffect(() => {
    if (meta?.title) {
      document.title = meta.title;
    }
  }, [meta?.title]);

  useEffect(() => {
    const title = meta?.title || "Nanjing Wanjia Precision Injection";
    const description = meta?.description || "";
    const keywords = meta?.keywords || "";
    const pathname = window.location.pathname || "/";
    const canonicalUrl = `${SITE_URL}${pathname}`;
    const ogImage = `${SITE_URL}/favicon.png`;
    const localeMap = { en: "en_US", zh: "zh_CN", ko: "ko_KR" };
    const inLanguage = langCode || "en";

    if (description) {
      upsertMeta('meta[name="description"]', { name: "description", content: description });
      upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
      upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    }
    if (keywords) {
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    }

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: localeMap[inLanguage] || "en_US" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large" });

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    document.head.querySelectorAll('link[data-hreflang="true"]').forEach((node) => node.remove());
    ["en", "zh", "ko"].forEach((code) => {
      const href = `${SITE_URL}${pathname}?lang=${code}`;
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", code);
      link.setAttribute("href", href);
      link.setAttribute("data-hreflang", "true");
      document.head.appendChild(link);
    });
    const xDefault = document.createElement("link");
    xDefault.setAttribute("rel", "alternate");
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.setAttribute("href", `${SITE_URL}${pathname}`);
    xDefault.setAttribute("data-hreflang", "true");
    document.head.appendChild(xDefault);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Nanjing Wanjia Precision Injection Co., Ltd.",
          alternateName: "南京万佳精密注塑有限公司",
          url: SITE_URL,
          logo: `${SITE_URL}/favicon.png`,
          sameAs: [SITE_URL],
        },
        {
          "@type": "WebPage",
          url: canonicalUrl,
          name: title,
          inLanguage,
          description,
          keywords,
        },
      ],
    };

    let script = document.head.querySelector('script[data-seo-jsonld="true"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo-jsonld", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [meta, langCode]);
};
