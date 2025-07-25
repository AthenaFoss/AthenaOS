import type { MetaTagsProps } from "svelte-meta-tags";

const DESCRIPTION = "Web-based desktop environment.";

export const load = ({ url }: { url: URL }) => {
  const baseMetaTags = Object.freeze({
    title: "Desktop",
    description: DESCRIPTION,
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: "website",
      url: new URL(url.pathname, url.origin).href,
      locale: "en_US",
      title: "Desktop",
      description: DESCRIPTION,
      siteName: "athenafoss.com",
      images: [
        {
          url: "https://desktop.kennyhui.dev/og/index.png",
        },
      ],
    },
  }) satisfies MetaTagsProps;

  return {
    baseMetaTags,
  };
};
