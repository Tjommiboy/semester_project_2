export function displayMessage(
  container,
  messageType = "error",
  message = "something went wrong"
) {
  let parent = container;

  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  //   const parent = document.querySelector(container);
  parent.innerHTML = `<div class="alert alert-${messageType}" role="alert">${message}</div>`;
}
