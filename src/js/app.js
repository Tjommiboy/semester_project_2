import { loginButton } from "./events/login.js";
import { registerButton } from "./events/register.js";
import { profileButton } from "./events/profile.js";
import { registerHandler } from "./events/auth/registerHandler.js";
import { loginHandler } from "./events/auth/loginHandler.js";
import { getListingsAndDisplay } from "./api/auth/getListings.js";
import { fetchSingleItem } from "./ui/singleItem.js";

function router() {
  const pathname = window.location.pathname;
  switch (pathname) {
    case "/index.html":
      console.log("home");
      loginButton("/login/index.html");
      registerButton("/register/index.html");
      getListingsAndDisplay();
      break;
    case "/register/index.html":
      console.log("register damnit");
      loginButton("/login/index.html");
      registerButton("/register/index.html");
      profileButton("/profile/index.html");
      registerHandler();

      break;
    case "/login/index.html":
      console.log("login");
      loginButton("/login/index.html");
      registerButton("/register/index.html");
      profileButton("/profile/index.html");
      loginHandler();
      break;
    case "/profile/index.html":
      console.log("profile");
      loginButton("/login/index.html");
      registerButton("/register/index.html");
      profileButton("/profile/index.html");
      break;
    case "/singleItem/index.html":
      console.log("singleItem");
      fetchSingleItem();
      loginButton("/login/index.html");
      registerButton("/register/index.html");
      profileButton("/profile/index.html");
      break;
    default:
      console.log("Page not found");
      break;
  }
}

router();
