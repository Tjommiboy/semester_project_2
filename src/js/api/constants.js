export const API_KEY = "1d63e6d7-3501-4b3a-8a83-d8834faba43a";

export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";

// export const apiKey = "/create-api-key";

// export async function getAPIkey() {
//   const response = await fetch(API_BASE + API_AUTH + apiKey, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${load("token")}`,
//     },
//     body: JSON.stringify({
//       name: "test key",
//     }),
//   });
//   if (response.ok) {
//     return await response.json();
//   }
//   console.error(await response.json());
//   throw new Error("Failed to get API key");
// }
