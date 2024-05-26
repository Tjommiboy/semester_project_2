import { registerHandler } from "./events/auth/registerHandler.js";
import { loginHandler } from "./events/auth/loginHandler.js";
import fetchSingleItem from "./ui/singleItem.mjs";
import {
  generatePagination,
  getListingsAndDisplay,
} from "./api/auth/getListings.js";
import { getProfile, populateProfile } from "./api/auth/profile.js";

const path = window.location.pathname;

if (path === "/index.html") {
  console.log("home");
  getListingsAndDisplay();
  generatePagination();
} else if (path === "/register/index.html") {
  console.log("register damnit");
  registerHandler();
} else if (path === "/login/index.html") {
  console.log("login");
  loginHandler();
} else if (path === "/profile/index.html") {
  console.log("profile");
  getProfile();
  populateProfile();
} else if (path === "/singleItem/index.html") {
  console.log("singleItem");
  fetchSingleItem();
}
