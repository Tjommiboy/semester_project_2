function loginButton(targetUrl) {
  document.getElementById("loginButton").addEventListener("click", function () {
    window.location.href = targetUrl;
  });
}

export { loginButton };
