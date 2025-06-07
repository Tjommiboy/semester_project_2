import { registerHandler } from "./events/auth/registerHandler.js";
import { loginHandler } from "./events/auth/loginHandler.js";
import { fetchSingleItem } from "./api/posts/read.js";
import { getListingsAndDisplay } from "./api/auth/getListings.js";
import { getProfile, populateProfile } from "./api/auth/profile/profile.js";
import { displayMenu } from "./components/shared/displayMenu.js";
import { CreateListingButton } from "./ui/post/create.js";
import { loadAndDisplayUserListings } from "./api/auth/profile/userListings.js";
import "../scss/index.scss";
const path = window.location.pathname.replace(/\/$/, "") || "/";

displayMenu();

switch (path) {
  case "/":
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
    loadAndDisplayUserListings();
    break;

  case "/singleItem/index.html":
    console.log("singleItem");
    fetchSingleItem();
    break;
  case "/create/index.html":
    console.log("create");
    CreateListingButton();
    break;
  case "/edit/index.html":
    console.log("edit");

    break;

  default:
    console.log("Unknown path:", path);
}

// import router from "./router/index.js";
// console.log("app.js is loaded");
// await router(window.location.pathname);
