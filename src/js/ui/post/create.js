import { createListing } from "../../api/posts/create.js";

export function CreateListingButton() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createListingForm");
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submit event detected");
        try {
          await onCreateListing(event); // Handle form submission
          console.log("Post creation completed");
        } catch (error) {
          console.error("Error during post creation:", error);
        }
      });
    } else {
      console.error("Form not found");
    }
  });
}

export async function onCreateListing(event) {
  event.preventDefault();

  const title = document.getElementById("createTitle").value.trim();
  const description = document.getElementById("createDescription").value.trim();
  const tagsInput = document.getElementById("tags").value.trim();
  const mediaUrl = document.getElementById("media-url").value.trim();
  const mediaAlt = document.getElementById("media-alt").value.trim();
  const endsAt = new Date(
    document.getElementById("endsAt").value,
  ).toISOString();

  // Prepare form data
  const formData = {
    title,
    description: description || "", // Optional field
    tags: tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [],
    media: mediaUrl
      ? [
          {
            url: mediaUrl,
            alt: mediaAlt || "No description provided",
          },
        ]
      : [],
    endsAt,
  };

  // Validate required fields
  if (!title || !endsAt) {
    alert("Title and end date are required fields.");
    return;
  }

  try {
    const response = await createListing(formData);
    console.log("Listing created successfully:", response);
    alert("Listing created successfully!");
    window.location.href = "/profile/index.html"; // Redirect to the homepage
  } catch (error) {
    console.error("Failed to create listing:", error);
    alert("Failed to create listing. Please try again.");
  }
}
