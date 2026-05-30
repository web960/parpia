import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { setSeoData } from "@/utils/seoData";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentInfoQuery } from "@/queries/general/ContentInfoQuery";
import { ContentMetaQuery } from "@/queries/general/ContentMetaQuery";
import { ContentNode } from "@/gql/graphql";
import PageTemplate from "@/components/Templates/Page/PageTemplate";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import PostTemplate from "@/components/Templates/Post/PostTemplate";
import HomePage from "@/components/Home/HomePage";
import { siteConfig } from "@/data/site";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

type ContentMetaNode = {
  title?: string | null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: slugParam } = await params;
  const slug = nextSlugToWpSlug(slugParam);
  const isPreview = slug.includes("preview");

  if (slug === "/" && !isPreview) {
    return {
      title: `${siteConfig.name} | ${siteConfig.tagline}`,
      description: siteConfig.description,
    };
  }

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentMetaNode }>(
    print(ContentMetaQuery),
    {
      slug: isPreview ? slug.split("preview/")[1] : slug,
      idType: isPreview ? "DATABASE_ID" : "URI",
    },
  );

  if (!contentNode) {
    return notFound();
  }

  const metadata = setSeoData({ title: contentNode.title });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
    },
  } as Metadata;
}

export function generateStaticParams() {
  return [];
}

export default async function Page({ params }: Props) {
  const { slug: slugParam } = await params;
  const slug = nextSlugToWpSlug(slugParam);
  const isPreview = slug.includes("preview");

  if (slug === "/" && !isPreview) {
    return <HomePage />;
  }

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(ContentInfoQuery),
    {
      slug: isPreview ? slug.split("preview/")[1] : slug,
      idType: isPreview ? "DATABASE_ID" : "URI",
    },
  );

  if (!contentNode) return notFound();

  switch (contentNode.contentTypeName) {
    case "page":
      return <PageTemplate node={contentNode} />;
    case "post":
      return <PostTemplate node={contentNode} />;
    default:
      return <p>{contentNode.contentTypeName} not implemented</p>;
  }
}
