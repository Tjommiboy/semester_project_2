import { API_BASE } from "../constants.js";

import { headers } from "../headers.mjs";

export async function getListingsAndDisplay(limit = 8, offset = 0) {
  console.log(`Fetching listings with limit=${limit} and offset=${offset}`);
  try {
    const response = await fetch(
      `${API_BASE}/auction/listings?limit=${limit}&offset=${offset}&_reactions=true&_author=true&_comments=true`,
      {
        headers: headers(),
      },
    );

    if (!response.ok) {
      console.error("Error fetching listings:", response.statusText);
      return;
    }

    const responseData = await response.json();
    console.log(responseData); // Log entire response

    const listingsData = responseData.data;
    const meta = responseData.meta;

    if (meta) {
      console.log(
        `Total items: ${meta.totalCount}, Total pages: ${meta.pageCount}`,
      );
    } else {
      console.error("Meta data not found in API response:", responseData);
    }

    if (!Array.isArray(listingsData)) {
      console.error("Listings data is not an array:", listingsData);
      return;
    }

    const container = document.getElementById("listingsContainer");
    container.innerHTML = "";

    listingsData.forEach(function (item) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.style.width = "16rem";

      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = item.title;
      cardBodyDiv.appendChild(title);

      const description = document.createElement("p");
      description.classList.add("card-text");
      description.textContent = item.description;
      cardBodyDiv.appendChild(description);

      if (item.media && item.media.length > 0) {
        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.src = item.media[0].url;
        image.alt = item.media[0].alt;
        cardDiv.appendChild(image);
      } else {
        const placeholderImage = document.createElement("img");
        placeholderImage.classList.add("card-img-top");
        placeholderImage.src = "/pictures/Missing-Person-Law.jpg";
        placeholderImage.alt = "Placeholder Image";
        cardDiv.appendChild(placeholderImage);
      }

      const _count = document.createElement("h4");
      _count.classList.add("bid_count");
      _count.textContent = "Bids: " + item._count.bids;
      cardBodyDiv.appendChild(_count);
      cardDiv.appendChild(cardBodyDiv);

      const updated = document.createElement("h5");
      updated.classList.add("card-updated");
      updated.textContent = item.updated;
      cardBodyDiv.appendChild(updated);
      cardDiv.appendChild(cardBodyDiv);

      cardDiv.addEventListener("click", function () {
        window.location.href = "singleItem.html?id=" + item.id;
      });

      container.appendChild(cardDiv);
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

const limit = 8;
let currentPage = 1;
const totalPages = 111;
const maxVisiblePages = 4;

async function fetchListings(page) {
  const offset = (page - 1) * limit;
  await getListingsAndDisplay(limit, offset);
}

function createPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // Previous Button
  const prevItem = document.createElement("li");
  prevItem.classList.add("page-item");
  if (currentPage === 1) {
    prevItem.classList.add("disabled");
  }
  const prevLink = document.createElement("a");
  prevLink.classList.add("page-link");
  prevLink.href = "#";
  prevLink.innerText = "Previous";
  prevLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      fetchListings(currentPage).then(createPagination);
    }
  });
  prevItem.appendChild(prevLink);
  pagination.appendChild(prevItem);

  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");
    if (i === currentPage) {
      pageItem.classList.add("active");
    }
    const pageLink = document.createElement("a");
    pageLink.classList.add("page-link");
    pageLink.href = "#";
    pageLink.innerText = i;
    pageLink.addEventListener("click", (event) => {
      event.preventDefault();
      currentPage = i;
      fetchListings(currentPage).then(createPagination);
    });
    pageItem.appendChild(pageLink);
    pagination.appendChild(pageItem);
  }

  const nextItem = document.createElement("li");
  nextItem.classList.add("page-item");
  if (currentPage === totalPages) {
    nextItem.classList.add("disabled");
  }
  const nextLink = document.createElement("a");
  nextLink.classList.add("page-link");
  nextLink.href = "#";
  nextLink.innerText = "Next";
  nextLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      fetchListings(currentPage).then(createPagination);
    }
  });
  nextItem.appendChild(nextLink);
  pagination.appendChild(nextItem);
}

fetchListings(currentPage).then(createPagination);
