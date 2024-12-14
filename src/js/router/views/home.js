import { showSpinner, hideSpinner } from "../../ui/spinner.js";
import { readListings } from "../../api/posts/read.js";

export async function displayListings() {
  showSpinner(); // Show the spinner while loading data
  try {
    const response = await readListings(); // Fetch listings
    const listings = response.data;

    const listingsContainer = document.getElementById("listingsContainer");
    listingsContainer.innerHTML = ""; // Clear existing listings

    listings.forEach((listing) => {
      const listingLink = document.createElement("a");
      listingLink.href = `/singleItem/index.html?id=${listing.id}`;
      listingLink.className = "listing-link";

      const listingElement = document.createElement("div");
      listingElement.className = "listing";

      // Create and append the title
      const titleElement = document.createElement("h3");
      titleElement.textContent = listing.title;
      listingElement.appendChild(titleElement);

      // Create and append the description
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = listing.description;
      listingElement.appendChild(descriptionElement);

      // Create and append the media (image or fallback text)
      if (listing.media && listing.media.length > 0) {
        const imgElement = document.createElement("img");
        imgElement.className = "listing-img";
        imgElement.src = listing.media[0].url;
        imgElement.alt = listing.media[0].alt || "Listing image";
        listingElement.appendChild(imgElement);
      } else {
        const noImageElement = document.createElement("p");
        noImageElement.textContent = "No image available";
        listingElement.appendChild(noImageElement);
      }

      // Create and append the bid count
      const bidCountElement = document.createElement("p");
      bidCountElement.textContent = `Bids: ${listing._count.bids}`;
      listingElement.appendChild(bidCountElement);

      // Create and append the updated date
      const updatedDateElement = document.createElement("p");
      updatedDateElement.textContent = `Last updated: ${new Date(
        listing.updated
      ).toLocaleDateString()}`;
      listingElement.appendChild(updatedDateElement);

      listingLink.appendChild(listingElement);
      listingsContainer.appendChild(listingLink);
    });
  } catch (error) {
    console.error("Error fetching or displaying listings:", error);
  } finally {
    hideSpinner(); // Ensure spinner is hidden in all cases
  }
}

// Call the function
document.addEventListener("DOMContentLoaded", displayListings);
