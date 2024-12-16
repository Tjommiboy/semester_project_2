import { loadProfile } from "../storage/loadProfile";

export function renderAdminbtns(listing) {
  const username = loadProfile();

  const { seller, id } = listing;

  const sellerName = seller.name;

  if (sellerName !== username) {
    return null;
  }
  const div = document.createElement("div");
  div.classList.add("admin-buttons");

  const editButton = document.createElement("a");
  editButton.href = `/edit/?id=${id}`;

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";

  div.append(editButton);
  div.append(delBtn);
  return div;
}
