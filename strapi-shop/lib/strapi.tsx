const STRAPI_URL = process.env.STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("STRAPI_URL is not defined");
}

export class StrapiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function strapifetch<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new StrapiError(401, "strapi_url_expired");
  }
  if (!response.ok) {
    throw new StrapiError(response.status, `strapi request failed:${response.status}`);
  }
  return response.json() as Promise<T>;
}