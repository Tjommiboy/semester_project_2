import { API_PROFILE } from "../../Utilities/constants.js";
import { headers } from "../../Utilities/headers.js";
import { showSpinner, hideSpinner } from "../../../ui/spinner.js";
import { deleteListing } from "../../posts/delete.js";

export async function loadAndDisplayUserListings() {
  try {
    const profileData = localStorage.getItem("profile");

    if (!profileData) {
      console.error("No profile data found in localStorage");
      return;
    }

    const profile = JSON.parse(profileData);
    const username = profile.name;

    const posts = await fetchUserListings(username);
    if (posts) displayListings(posts);
  } catch (error) {
    console.error("Error loading or displaying posts:", error);
  }
}

async function fetchUserListings(username) {
  showSpinner();
  try {
    const response = await fetch(`${API_PROFILE}/${username}/listings`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const jsonResponse = await response.json(); // Parse the JSON response
    console.log("API Response:", jsonResponse); // Log the response to inspect its structure

    return jsonResponse.data; // Assuming 'data' contains the listings
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    hideSpinner();
  }
}
function displayListings(posts) {
  const listingContainer = document.getElementById("listingContainer");
  listingContainer.classList.add("row"); // Use Bootstrap grid system for the container

  if (!listingContainer) {
    console.error("Listing container not found");
    return;
  }

  listingContainer.innerHTML = "";

  if (!Array.isArray(posts) || posts.length === 0) {
    listingContainer.innerHTML = "<p>No listings found.</p>";
    return;
  }

  posts.forEach(({ id, title, description, tags = [], media, created }) => {
    // Create the card container div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-4");
    // Create card body container
    const cardBodyDiv = document.createElement("div");

    cardBodyDiv.classList.add("card-body", "my-2");

    // Create title element
    const titleElement = document.createElement("h5");
    titleElement.textContent = title;
    titleElement.classList.add("card-title");
    cardBodyDiv.appendChild(titleElement);

    // Create description element
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("card-text");
    cardBodyDiv.appendChild(descriptionElement);

    // Handle media (image)
    const imageElement =
      media && media.length > 0
        ? createImageElement(media[0].url, media[0].alt)
        : createPlaceholderImage();
    imageElement.classList.add("card-img-top", "my-2");
    imageElement.addEventListener("click", function () {
      window.location.href = `/singleItem/index.html?id=${id}`;
    });
    cardDiv.appendChild(imageElement);

    // Add tags element (optional)
    if (tags.length > 0) {
      const tagsElement = document.createElement("p");
      tagsElement.classList.add("card-text");
      tagsElement.textContent = `Tags: ${tags.join(", ")}`;
      cardBodyDiv.appendChild(tagsElement);
    }

    // Add the created date element
    const createdElement = document.createElement("p");
    createdElement.classList.add("card-text", "text-muted");
    createdElement.textContent = `Created on: ${new Date(created).toLocaleString()}`;
    cardBodyDiv.appendChild(createdElement);

    // Add Edit and Delete buttons
    const editButton = createButton("Edit", "edit-button", "btn-warning");
    editButton.classList.add("mx-1", "my-1");
    const deleteButton = createButton("Delete", "delete-button", "btn-danger");
    cardBodyDiv.appendChild(editButton);
    cardBodyDiv.appendChild(deleteButton);

    // Append the body to the card
    cardDiv.appendChild(cardBodyDiv);

    // Append the card to the container
    listingContainer.appendChild(cardDiv);

    // Handle Edit button click
    editButton.onclick = (event) => {
      event.preventDefault();
      window.location.href = `/edit/?listingId=${id}`;
    };

    // Handle Delete button click
    deleteButton.onclick = (event) => {
      event.preventDefault();
      deleteListing(id);
    };
  });
}

// Helper function to create a button
function createButton(text, className, buttonClass) {
  const button = document.createElement("button");
  button.classList.add(className, "btn", buttonClass);
  button.textContent = text;
  return button;
}

// Helper function to create an image element
function createImageElement(src, alt) {
  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.style.maxHeight = "200px"; // Set a max height for consistent card sizing
  img.src = src;
  img.alt = alt || "Post media";
  return img;
}

// Helper function to create a placeholder image
function createPlaceholderImage() {
  const placeholderImage = document.createElement("img");
  placeholderImage.classList.add("card-img-top");
  placeholderImage.src = "/pictures/Missing-Person-Law.jpg";
  placeholderImage.alt = "Placeholder Image";
  return placeholderImage;
}
