import { draftMode, cookies } from "next/headers";

const MAX_RETRIES = 3;

async function fetchWithRetry(
  url: string,
  options: RequestInit,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * (attempt + 1)),
        );
      }
    }
  }

  throw lastError;
}

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: { [key: string]: any },
  headers?: { [key: string]: string },
): Promise<T> {
  const { isEnabled: preview } = await draftMode();

  try {
    let authHeader = "";
    if (preview) {
      const auth = (await cookies()).get("wp_jwt")?.value;
      if (auth) {
        authHeader = `Bearer ${auth}`;
      }
    }

    const body = JSON.stringify({
      query,
      variables: {
        preview,
        ...variables,
      },
    });

    const response = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Next.js WordPress Example",
          ...(authHeader && { Authorization: authHeader }),
          ...headers,
        },
        body,
        cache: preview ? "no-cache" : "default",
        next: {
          tags: ["wordpress"],
        },
      },
    );

    if (!response.ok) {
      console.error("Response Status:", response.status, response.statusText);
      throw new Error(`WordPress GraphQL request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", JSON.stringify(data.errors, null, 2));
      const message = data.errors
        .map((error: { message?: string }) => error.message)
        .filter(Boolean)
        .join("; ");
      throw new Error(
        message
          ? `Error executing GraphQL query: ${message}`
          : "Error executing GraphQL query",
      );
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error && error.message.includes("ECONNRESET")) {
      console.error(
        "Connection to WordPress was reset. The server may be slow or unavailable.",
      );
    }
    console.error(error);
    throw error;
  }
}
