import { cookies } from "next/headers";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const STORE_API = "/wp-json/wc/store/v1";

export const CART_TOKEN_COOKIE = "wc_cart_token";
export const CART_NONCE_COOKIE = "wc_cart_nonce";

function storeUrl(path: string) {
  if (!WP_URL) throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not configured");
  return `${WP_URL.replace(/\/$/, "")}${STORE_API}${path}`;
}

function readHeader(response: Response, name: string): string | null {
  return response.headers.get(name) ?? response.headers.get(name.toLowerCase());
}

export async function saveCartSession(response: Response) {
  const cookieStore = await cookies();
  const token = readHeader(response, "Cart-Token");
  const nonce = readHeader(response, "Nonce");

  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };

  if (token) cookieStore.set(CART_TOKEN_COOKIE, token, opts);
  if (nonce) cookieStore.set(CART_NONCE_COOKIE, nonce, opts);
}

export async function wcStoreMutation<T>(
  path: string,
  init: RequestInit = {},
): Promise<{ data: T; response: Response }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CART_TOKEN_COOKIE)?.value;
  const nonce = cookieStore.get(CART_NONCE_COOKIE)?.value;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": "ParpiaGold-NextJS/1.0",
    ...(init.headers as Record<string, string>),
  };

  if (init.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers["Cart-Token"] = token;
  if (nonce) headers["Nonce"] = nonce;

  const response = await fetch(storeUrl(path), {
    ...init,
    headers,
    cache: "no-store",
  });

  await saveCartSession(response);

  const text = await response.text();
  let data: T;
  try {
    data = text ? (JSON.parse(text) as T) : ({} as T);
  } catch {
    throw new Error(`Invalid WooCommerce response (${response.status})`);
  }

  if (!response.ok) {
    const message =
      (data as { message?: string })?.message ??
      `WooCommerce error (${response.status})`;
    throw new Error(message);
  }

  return { data, response };
}

export async function wcStoreGet<T>(path: string): Promise<{ data: T; response: Response }> {
  return wcStoreMutation<T>(path, { method: "GET" });
}
