import * as storage from "../../storage/index.js";
import { API_KEY } from "./constants.js";

export function headers(hasBody = false) {
  const headers = new Headers();

  const token = storage.loadToken("token");
  const profile = storage.loadToken("profile");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  if (profile && profile.username) {
    headers.append("X-User-Profile", profile.username);
  }
  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }
  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }

  return headers;
}
