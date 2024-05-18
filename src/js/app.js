import { profileButton } from "./events/profile.js";
import { registerHandler } from "./events/auth/registerHandler.js";
import { loginHandler } from "./events/auth/loginHandler.js";
import fetchSingleItem from "./ui/singleItem.mjs";
import getListingsAndDisplay from "./api/auth/getListings.js";

switch (window.location.pathname) {
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

    profileButton("/profile/index.html");
    break;
  case "/singleItem/index.html":
  case "/singleItem/":
  case "/singleItem":
    console.log("singleItem");
    fetchSingleItem();

    break;
}
