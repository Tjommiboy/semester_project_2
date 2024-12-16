import { API_DELETE } from "../Utilities/constants.js";
import { headers } from "../Utilities/headers.js";
import { loadAndDisplayUserListings } from "../auth/profile/userListings.js";

export async function deleteListing(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this listing?",
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_DELETE}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete listing");
    }

    loadAndDisplayUserListings();
  } catch (error) {
    console.error("Error deleting listing:", error);
  }
}
