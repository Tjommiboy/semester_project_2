import { onlogout } from "../../api/auth/logout.js";
import { isLoggedIn } from "../../storage/isLoggedIn.js";

export function displayMenu() {
  const nav = document.querySelector("#top-nav");
  nav.innerHTML = "";
  if (nav) {
    if (isLoggedIn()) {
      nav.innerHTML = `
        <div class="title-parent">
          <a href="/">
            <h1 class="title">Gimmi</h1>
            <div class="subtitle">
              <span class="subtitle">Bid </span>
              <span class="n">N</span>
              <span class="subtitle">´Sell</span>
            </div>
          </a>
        </div>
        <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a href="/profile/index.html" id="profileButton" class="btn btn-primary me-2 mb-1">Profile</a>
        </li>
        <li class="nav-item">
        <a href="/create/index.html" id="createButton" class="btn btn-primary me-2 mb-1">Create</a>
      </li>
        <li class="nav-item">
          <button
            id="logOutButton"
            type="button"
            class="btn btn-primary me-2"
            data-auth="logout"
            data-visible="loggedIn">
            Logout
          </button>
        </li>
        </ul>
        </div> `;
      onlogout(); // Call this after rendering the menu
    } else {
      nav.innerHTML = ` <div class="title-parent">
      <a href="../index.html">
        <h1 class="title">Gimmi</h1>
        <div class="subtitle">
          <span class="subtitle">Bid </span>
          <span class="n">N</span>
          <span class="subtitle">´Sell</span>
        </div>
      </a>
    </div>
    <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a href="/login/index.html" id="loginButton" class="btn btn-primary me-2 mb-1">Login</a>
        </li>
        <li class="nav-item">
          <a href="/register/index.html" id="registerButton" class="btn btn-primary me-2 mb-1">Register</a>
        </li>
        </ul>
        </div>`;
    }
  }
}
