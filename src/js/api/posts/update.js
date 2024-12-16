import { profile } from "../auth/state.js";
import { API_UPDATE } from "../Utilities/constants.js";
import { headers } from "../Utilities/headers.js";

export async function updateListing(id, title, body, media, tags, endsAt) {
  const { name: owner } = profile();

  const response = await fetch(`${API_UPDATE}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, body, media, tags, endsAt, owner }),
    headers: headers("application/json"),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
