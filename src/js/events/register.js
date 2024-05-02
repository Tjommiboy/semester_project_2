function registerButton(targetUrl) {
  document
    .getElementById("registerButton")
    .addEventListener("click", function () {
      window.location.href = targetUrl;
    });
}

export { registerButton };
