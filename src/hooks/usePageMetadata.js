import { useEffect } from "react";

export const usePageMetadata = (meta = {}, langCode = "en") => {
  useEffect(() => {
    if (meta?.title) {
      document.title = meta.title;
    }
  }, [meta?.title]);

  useEffect(() => {
    if (!meta?.description) {
      return;
    }
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", meta.description);
  }, [meta?.description]);

  useEffect(() => {
    if (langCode) {
      document.documentElement.lang = langCode;
    }
  }, [langCode]);
};

