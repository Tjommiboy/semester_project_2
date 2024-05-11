import { loginButton } from "./events/login.js";
import { registerButton } from "./events/register.js";
import { registerHandler } from "./events/auth/registerHandler.js";
import { loginHandler } from "./events/auth/loginHandler.js";

function router() {
  const pathname = window.location.pathname;
  switch (pathname) {
    case "/index.html":
      loginButton("/login/index.html");
      registerButton("/register/index.html");

      console.log("home");
      break;
    case "/register/index.html":
      console.log("register damnit");
      loginButton("../../login/index.html");
      registerButton("../../register/index.html");
      registerHandler();
      break;
    case "/login/index.html":
      console.log("login");
      loginButton("../../login/index.html");
      registerButton("../../register/index.html");
      loginHandler();
      break;
  }
}
router();
