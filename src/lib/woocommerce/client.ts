const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const STORE_API = "/wp-json/wc/store/v1";

export async function fetchStore<T>(
  path: string,
  revalidate = 3600,
): Promise<T> {
  if (!WP_URL) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not configured");
  }

  const url = `${WP_URL.replace(/\/$/, "")}${STORE_API}${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "ParpiaGold-NextJS/1.0",
    },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(
      `WooCommerce Store API error (${response.status}) for ${path}`,
    );
  }

  return response.json() as Promise<T>;
}
