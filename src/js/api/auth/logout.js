import { removeToken } from "../../storage/remove.js";

export function onlogout() {
  document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.querySelector("#logOutButton");

    if (!logoutButton) {
      console.error("Logout button not found");
      return;
    }

    logoutButton.addEventListener("click", () => {
      console.log("Logout button clicked");
      removeToken();
      window.location.href = "/login/index.html";
    });
  });
}
