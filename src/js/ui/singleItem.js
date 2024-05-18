import { API_BASE } from "../api/constants.js";

const singleItem = document.getElementById("singleItem");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

const url = `${API_BASE}/auction/listings/${id}`;

export async function fetchSingleItem() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    singleItem.innerHTML = `
    <h1>${data.title}</h1>
    <p>${data.description}</p>
    <p>${data.price}</p>
    <img src="${data.media[0].fullUrl}" alt="${data.title}">
    `;
  } catch (error) {
    console.error(error);
    singleItem.innerHTML = "An error occured while fetching the data";
  }
}
