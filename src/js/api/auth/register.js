import { API_BASE } from "../constants.js";
import { API_AUTH } from "../constants.js";
import { API_REGISTER } from "../constants.js";
import { headers } from "../headers.mjs";

export async function registerUser(user) {
  const url = API_BASE + API_AUTH + API_REGISTER;

  const options = {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify(user),
  };
  const response = await fetch(url, options);
  const json = await response.json();
  console.log(response);
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }
  return json;
}
