import { headers } from "./headers.js";

export async function authFetch(url, options = {}) {
  const headersObj = headers(Boolean(options.body));

  return fetch(url, {
    ...options,
    headers: headersObj,
  });
}
