import { API_BASE } from "../Utilities/constants.js";
import { API_AUTH } from "../Utilities/constants.js";
import { API_LOGIN } from "../Utilities/constants.js";
import { showSpinner, hideSpinner } from "../../ui/spinner.js";
// import { updateLoginVisibility } from "../../ui/auth.js";

import * as storage from "../../storage/index.js";
import { headers } from "../Utilities/headers.js";

export async function loginUser(user) {
  const url = API_BASE + API_AUTH + API_LOGIN;

  const options = {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify(user),
  };
  showSpinner();
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      throw new Error(responseData.errors?.[0]?.message || "Login failed");
    }

    const accessToken = responseData.data.accessToken;
    storage.save("token", accessToken);

    const profile = {
      name: responseData.data.name,
      email: responseData.data.email,
      avatar: responseData.data.avatar.url,
      banner: responseData.data.banner.url,
      bio: responseData.data.bio,
    };

    storage.save("profile", profile);

    // Redirect to the ./index.html page upon successful login
    window.location.href = "/";

    return responseData.data;
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  } finally {
    hideSpinner();
  }
}
