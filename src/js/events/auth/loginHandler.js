import { loginUser } from "../../api/auth/register.js";
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
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  if (data.bio.trim() === "") {
    delete data.bio;
  }
  if (data.avatarUrl.trim() === "") {
    delete data.avatarUrl;
  } else {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${data.name}'s avatar`,
    };
    delete data.avatarUrl;
  }

  const container = document.querySelector("#message");

  console.log(data);
  const fieldset = document.querySelector("fieldset");
  try {
    fieldset.disabled = true;
    await loginUser(data);
    displayMessage(
      "#message",
      "success",
      "Successfully Registered. Please <a href='/login/index.html'>login</a>",
    );
    form.reset();
  } catch (error) {
    displayMessage(container, "warning", error.message);
  } finally {
    fieldset.disabled = false;
  }
}
