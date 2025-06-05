import { authFetch } from "../../Utilities/authfetch.js";
import { API_PROFILE } from "../../Utilities/constants.js";
import { showSpinner, hideSpinner } from "../../../ui/spinner.js";
import { loadProfile } from "../../../storage/loadProfile.js";
// import { authGuard } from "../../../storage/authguard.js";

// authGuard();

export async function getProfile() {
  try {
    showSpinner();
    const profile = loadProfile("profile");

    if (!profile || !profile.name) {
      const missingField = !profile ? "Profile" : "Name";
      throw new Error(`${missingField} not found in local storage`);
    }

    const url = `${API_PROFILE}/${profile.name}`;

    const response = await authFetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
}

export async function populateProfile() {
  try {
    const profileData = await getProfile();
    console.log("Profile data:", profileData);
    const { name, email, avatar, banner, bio, credits } = profileData.data;

    document.getElementById("name").textContent = name;
    document.getElementById("email").textContent = email;
    document.getElementById("avatar").src = avatar.url;
    document.getElementById("banner").src = banner.url;
    document.getElementById("bio").textContent = bio || "No bio available";
    document.getElementById("credits").textContent = "Credits :" + credits;
    hideSpinner();
  } catch (error) {
    console.error("Error populating profile:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {});
