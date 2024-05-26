import { API_BASE } from "../constants.js";
import { API_AUTH } from "../constants.js";
import { API_REGISTER } from "../constants.js";
import { headers } from "../headers.js";
import { showSpinner, hideSpinner } from "../../ui/spinner.js";

export async function registerUser(user) {
  showSpinner(); // Call showSpinner as a function

  const url = `${API_BASE}${API_AUTH}${API_REGISTER}`;

  const options = {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Registration failed");
    }

    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    hideSpinner(); // Ensure hideSpinner is called in both success and error cases
  }
}
