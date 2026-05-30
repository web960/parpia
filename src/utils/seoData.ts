type SeoFields = {
  title?: string | null;
  metaDesc?: string | null;
  metaRobotsNoindex?: string | null;
  metaRobotsNofollow?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphUrl?: string | null;
  opengraphSiteName?: string | null;
  opengraphType?: string | null;
  opengraphImage?: {
    sourceUrl?: string | null;
    altText?: string | null;
    mediaDetails?: { width?: number | null; height?: number | null } | null;
  } | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: { sourceUrl?: string | null } | null;
};

export const setSeoData = ({
  seo,
  title,
}: {
  seo?: SeoFields | null;
  title?: string | null;
}) => {
  if (seo) {
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
      title: seo.title || title || "",
      description: seo.metaDesc || "",
      robots: {
        index: seo.metaRobotsNoindex === "index" ? true : false,
        follow: seo.metaRobotsNofollow === "follow" ? true : false,
      },
      openGraph: {
        title: seo.opengraphTitle || "",
        description: seo.opengraphDescription || "",
        url: seo.opengraphUrl || "",
        siteName: seo.opengraphSiteName || "",
        images: [
          {
            url: seo.opengraphImage?.sourceUrl || "",
            width: seo.opengraphImage?.mediaDetails?.width || 1200,
            height: seo.opengraphImage?.mediaDetails?.height || 630,
            alt: seo.opengraphImage?.altText || "",
          },
        ],
        locale: "da_DK",
        type: seo.opengraphType || "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seo.twitterTitle || "",
        description: seo.twitterDescription || "",
        images: [seo.twitterImage?.sourceUrl || ""],
      },
    };
  }

  if (title) {
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
      title,
    };
  }

  return {};
};
