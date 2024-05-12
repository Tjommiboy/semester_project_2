import { API_BASE } from "../constants.js";
import { API_AUTH } from "../constants.js";
import { API_LOGIN } from "../constants.js";

import * as storage from "../../storage/index.js";

export async function loginUser(user) {
  const url = API_BASE + API_AUTH + API_LOGIN;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      throw new Error(responseData.errors?.[0]?.message || "Login failed");
    }

    const accessToken = responseData.data.accessToken;
    storage.save("token", accessToken);

    return responseData.data;
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
}
