function loginButton() {
  document.getElementById("loginButton").addEventListener("click", function () {
    window.location.href = "/login/index.html";
  });
}

export { loginButton };
