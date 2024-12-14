import { apiPath } from "../Utilities/constants.js";
import { headers } from "../Utilities/headers.js";

export async function react(postId, symbol) {
  const response = await fetch(
    `${apiPath}/social/posts/${postId}/react/${symbol}`,
    {
      headers: headers(),
      method: "put",
    }
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
