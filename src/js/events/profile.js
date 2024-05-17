function profileButton(targetUrl) {
  document
    .getElementById("profileButton")
    .addEventListener("click", function () {
      window.location.href = targetUrl;
    });
}

export { profileButton };
