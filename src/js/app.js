import { registerHandler } from "./events/auth/registerHandler.js";
import { loginHandler } from "./events/auth/loginHandler.js";
import { fetchSingleItem } from "./api/posts/read.js";
import { getListingsAndDisplay } from "./api/auth/getListings.js";
import { getProfile, populateProfile } from "./api/auth/profile.js";
import { displayMenu } from "./components/shared/displayMenu.js";

const path = window.location.pathname;

displayMenu();
switch (path) {
  case "/index.html":
    console.log("home");
    getListingsAndDisplay();
    break;

  case "/register/index.html":
    console.log("register damnit");
    registerHandler();
    break;

  case "/login/index.html":
    console.log("login");
    loginHandler();
    break;

  case "/profile/index.html":
    console.log("profile");
    getProfile();
    populateProfile();
    break;

  case "/singleItem/index.html":
    console.log("singleItem");
    fetchSingleItem();
    break;
  case "/create/index.html":
    console.log("create");
    break;

  default:
    console.log("Unknown path:", path);
}

// import router from "./router/index.js";
// console.log("app.js is loaded");
// await router(window.location.pathname);
