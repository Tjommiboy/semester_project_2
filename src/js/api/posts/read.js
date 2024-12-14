import { API_BASE } from "../Utilities/constants.js";
import { getParam } from "../Utilities/getParam.js";
import { headers } from "../Utilities/headers.js";
import { setTitle } from "../Utilities/setTitle.js";

export async function readListings(limit = 100, offset = 0) {
  try {
    const response = await fetch(
      `${API_BASE}/auction/listings?limit=${limit}&offset=${offset}&_reactions=true&_seller=true&_comments=true`,
      {
        headers: headers(),
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching listings: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

export async function fetchSingleItem() {
  const queryString = document.location.search;
  const id = getParam("id");
  const url = `${API_BASE}/auction/listings/${id}?_seller=true&_reactions=true&_comments=true`; // Added _seller=true to include seller information
  const singleItem = document.querySelector("div#singleItem");
  const singleItemInfo = document.querySelector("div#singleItemInfo");
  const seller = document.querySelector("div#seller");

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const endsAtDate = data.data.endsAt.split("T")[0];
    const updatedAtDate = data.data.updated.split("T")[0];
    setTitle(data.data.title);
    if (!singleItem || !singleItemInfo) {
      throw new Error("Required DOM elements not found");
    }

    singleItem.innerHTML = "";
    singleItemInfo.innerHTML = "";
    seller.innerHTML = "";
    const titleElement = document.createElement("h1");
    titleElement.textContent = data?.data?.title || "No Title";
    singleItem.appendChild(titleElement);

    const imageElement = document.createElement("img");
    imageElement.classList.add("singleItem");
    imageElement.src =
      data?.data?.media && data?.data?.media.length > 0
        ? data.data.media[0].url
        : "/pictures/Missing-Person-Law.jpg";
    imageElement.alt =
      data?.data?.media && data?.data?.media.length > 0
        ? data.data.media[0].alt || data.data.title
        : "Placeholder Image";
    singleItem.appendChild(imageElement);

    const descriptionPara = document.createElement("p");
    descriptionPara.classList.add("singleItemDescription");
    descriptionPara.textContent = `Description: ${data?.data?.description || "No description available"}`;
    singleItemInfo.appendChild(descriptionPara);

    const bidsPara = document.createElement("p");
    bidsPara.classList.add("singleItemBid");
    bidsPara.textContent = `Bids: ${data.data._count.bids}`;
    singleItemInfo.appendChild(bidsPara);

    const countdownPara = document.createElement("p");
    countdownPara.classList.add("singleItemCountdown");
    countdownPara.innerHTML = `Time left: <span id="countdown"></span>`;
    singleItemInfo.appendChild(countdownPara);

    const endsAtPara = document.createElement("p");
    endsAtPara.classList.add("singleItemPrice");
    endsAtPara.textContent = `Ends at: ${endsAtDate}`;
    singleItemInfo.appendChild(endsAtPara);

    const updatedAtPara = document.createElement("p");
    updatedAtPara.classList.add("singleItemUpdated");
    updatedAtPara.textContent = `Last updated: ${updatedAtDate}`;
    singleItemInfo.appendChild(updatedAtPara);

    const sellerInfoPara = document.createElement("p");
    sellerInfoPara.classList.add("sellerInfo");
    sellerInfoPara.textContent = `Seller: ${data.data.seller.name} (${data.data.seller.email})`;
    seller.appendChild(sellerInfoPara);

    const sellerAvatar = document.createElement("img");
    sellerAvatar.classList.add("sellerAvatar");
    sellerAvatar.src = data.data.seller.avatar.url;
    sellerAvatar.alt = data.data.seller.avatar.alt || "Seller Avatar";
    seller.appendChild(sellerAvatar);

    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
      const now = new Date();
      const endsAt = new Date(data.data.endsAt);

      const timeLeft = endsAt - now;

      if (timeLeft <= 0) {
        countdownElement.textContent = "Auction ended";
        clearInterval(timer);
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
  } catch (error) {
    console.error(error);
    if (singleItem) {
      singleItem.innerHTML = "An error occurred while fetching the data";
    }
  }
}
