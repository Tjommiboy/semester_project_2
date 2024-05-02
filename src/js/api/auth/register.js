import { REGISTER_URL } from "../constants.js";

export async function registerUser(user) {
  const url = REGISTER_URL;

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
    throw new Error(json.errors[0].message);
  }
}
