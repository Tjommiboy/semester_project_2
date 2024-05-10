import { API_BASE } from "../constants.js";
import { API_AUTH } from "../constants.js";
import { API_LOGIN } from "../constants.js";

export async function loginUser(user) {
  const url = API_BASE + API_AUTH + API_LOGIN;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(url, options);
  const json = await response.json();
  console.log(response);
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }
  return json;
}
