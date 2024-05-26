import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";
import { showSpinner, hideSpinner } from "../../ui/spinner.js";

export async function getListingsAndDisplay(limit = 8, offset = 0) {
  showSpinner();
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
    // console.log(responseData); // Log entire response

    const listingsData = responseData.data;
    const meta = responseData.meta;

    if (meta) {
      console.log(
        `Total items: ${meta.totalCount}, Total pages: ${meta.pageCount}`,
      );
      console.log(meta);
      generatePagination(meta, limit, offset); // Generate pagination
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
        window.location.href = "/singleItem/index.html?id=" + item.id;
      });

      container.appendChild(cardDiv);
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  hideSpinner();
}

export function generatePagination(meta, itemsPerPage, currentOffset) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear existing pagination

  const currentPage = meta.currentPage;
  const isFirstPage = meta.isFirstPage;
  const isLastPage = meta.isLastPage;
  const totalPages = meta.pageCount;

  const maxPagesToShow = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  if (!isFirstPage) {
    const prevItem = document.createElement("li");
    prevItem.classList.add("page-item");
    prevItem.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevItem.addEventListener("click", () => {
      const newOffset = currentOffset - itemsPerPage;
      getListingsAndDisplay(itemsPerPage, newOffset < 0 ? 0 : newOffset);
    });
    paginationContainer.appendChild(prevItem);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");
    if (i === currentPage) {
      pageItem.classList.add("active");
    }
    pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    pageItem.addEventListener("click", () => {
      const newOffset = itemsPerPage * (i - 1);
      getListingsAndDisplay(itemsPerPage, newOffset);
    });
    paginationContainer.appendChild(pageItem);
  }

  if (!isLastPage) {
    const nextItem = document.createElement("li");
    nextItem.classList.add("page-item");
    nextItem.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextItem.addEventListener("click", () => {
      const newOffset = currentOffset + itemsPerPage;
      getListingsAndDisplay(itemsPerPage, newOffset);
    });
    paginationContainer.appendChild(nextItem);
  }
}
