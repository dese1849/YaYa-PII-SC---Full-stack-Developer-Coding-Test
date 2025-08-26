import CryptoJS from "crypto-js";
import { API_SECRET, API_KEY } from "../config/env.js";

export function generateSignedHeaders({ method, endpoint, body = "" }) {
  const timestamp = Date.now().toString();
  const jsonBody = body ? JSON.stringify(body) : "";
  const prehash = `${timestamp}${method.toUpperCase()}${endpoint}${jsonBody}`;
  const hmac = CryptoJS.HmacSHA256(prehash, API_SECRET);
  const signature = CryptoJS.enc.Base64.stringify(hmac);

  return {
    "Content-Type": "application/json",
    "YAYA-API-KEY": API_KEY,
    "YAYA-API-TIMESTAMP": timestamp,
    "YAYA-API-SIGN": signature,
  };
}
