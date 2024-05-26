import { loginUser } from "../../api/auth/login.js";
import { displayMessage } from "../../ui/auth/posts/common/displayMessage.js";

export function loginHandler() {
  console.log("loginHandler");
  const form = document.querySelector("#loginForm");
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();

  console.log("Form submitted. Event:", event);

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log("Form data:", data);

  const container = document.querySelector("#message");

  console.log(data);
  const fieldset = document.querySelector("fieldset");
  try {
    fieldset.disabled = true;

    console.log("Attempting login with data:", data);

    await loginUser(data);
    displayMessage("#message", "success", "Successfully logged in!");
    form.reset();
  } catch (error) {
    displayMessage(container, "warning", error.message);
  } finally {
    fieldset.disabled = false;
  }
}
