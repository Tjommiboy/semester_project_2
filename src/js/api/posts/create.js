import { hideSpinner, showSpinner } from "../../ui/spinner.js";
import { authFetch } from "../Utilities/authfetch.js";
import { API_CREATE } from "../Utilities/constants.js";

export async function createListing(formData) {
  showSpinner();
  try {
    if (formData.media && formData.media.length > 0) {
      for (const media of formData.media) {
        try {
          const url = new URL(media.url);
          if (!url.protocol.startsWith("http")) {
            throw new Error(`Invalid media URL: ${media.url}`);
          }
        } catch (error) {
          throw new Error(`Invalid URL in media array: ${media.url}`);
        }
      }
    }

    const response = await authFetch(`${API_CREATE}`, {
      method: "POST",

      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create listing: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating listing:", error.message);
    throw error;
  } finally {
    hideSpinner();
  }
}
