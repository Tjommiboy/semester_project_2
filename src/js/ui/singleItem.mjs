import { API_BASE } from "../api/constants.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = `${API_BASE}/auction/listings/${id}`;
const singleItem = document.querySelector("div#singleItem");

export default async function fetchSingleItem() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const endsAtDate = data.data.endsAt.split("T")[0];
    const updatedAtDate = data.data.updated.split("T")[0];

    singleItem.innerHTML = `
      <h1>${data?.data?.title}</h1>
      <p class="singleItemDiscription">${data?.data?.description}</p>


      <img class="singleItem" src=${data?.data?.media[0]?.url} alt="${data.title}">
      <p class="singleItemBid">Bids: ${data.data._count.bids}</p>
      <p class="singleItemCountdown">Time left: <span id="countdown"></span></p>
      <p class="singleItemPrice">Ends at: ${endsAtDate}</p>


      <p class="singleItemUpdated">Last updated: ${updatedAtDate}</p>
    `;

    // Start the countdown timer
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
    singleItem.innerHTML = "An error occurred while fetching the data";
  }
}
