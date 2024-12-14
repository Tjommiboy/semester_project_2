import { apiPath } from "../Utilities/constants.js";
import { headers } from "../Utilities/headers.js";

export async function deletePost(id) {
  const response = await fetch(`${apiPath}/social/posts/${id}`, {
    method: "delete",
    headers: headers(),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
