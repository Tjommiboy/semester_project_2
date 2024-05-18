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

    singleItem.innerHTML = `
    <h1>${data?.data?.title}</h1>
    <p>${data?.data?.description}</p>
    <p>${data.data?.price}</p>
    <img src=${data?.data?.media[0]?.url} alt="${data.title}">
    `;
  } catch (error) {
    console.error(error);
    singleItem.innerHTML = "An error occured while fetching the data";
  }
}
