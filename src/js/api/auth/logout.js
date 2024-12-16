import { removeToken } from "../../storage/remove.js";

export function onlogout() {
  const logoutButton = document.querySelector("#logOutButton");

  if (!logoutButton) {
    console.error("Logout button not found");
    return;
  }

  // Log to check if the event listener is added multiple times
  console.log("Adding event listener to logout button");

  logoutButton.addEventListener("click", () => {
    console.log("Logout button clicked");
    removeToken();
    window.location.href = "/login/index.html";
  });
}
