const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error(
    "NEXT_PUBLIC_STRAPI_URL is not defined."
  );
}

export function getImageUrl(
  url?: string | null
) {
  if (!url) {
    return null;
  }

  if (url.startsWith("http")) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}