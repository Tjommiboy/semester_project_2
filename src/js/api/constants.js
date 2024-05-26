// import { load } from "../storage/index.js";

// import { headers } from "./headers";

export const API_KEY = "f426f15c-89e4-49c1-858f-c746e3f09c0e";
export const API_KEY_URL = "/create-api-key";

export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_PROFILE = "/auction/profiles";

// export async function getAPIkey() {
//   const response = await fetch(API_BASE + API_AUTH + API_KEY_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorrization: `Bearer ${load("token")}`,
//     },
//     body: JSON.stringify({
//       name: "firstkey",
//     }),
//   });

//   if (response.ok) {
//     return await response.json();
//   }
//   throw new Error("Failed to fetch API key");
// }

// getAPIkey().then(console.log);
