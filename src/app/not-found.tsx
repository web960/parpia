import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404 Not Found",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404-not-found/`,
    },
  };
}

export default function NotFound() {
  return (
    <main>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </main>
  );
}
