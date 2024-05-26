import { logout } from "../../api/auth/logout.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event triggered");
  const logoutButton = document.getElementById("logOutButton");

  logoutButton.addEventListener("click", logout);
});
