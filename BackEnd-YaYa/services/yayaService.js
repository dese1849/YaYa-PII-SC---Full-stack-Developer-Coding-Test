import axios from "axios";
import { BASE_URL } from "../config/env.js";
import { generateSignedHeaders } from "../utils/signRequest.js";

export async function fetchTransactions(page = 1) {
  const endpoint = "/api/en/transaction/find-by-user";
  const url = `${BASE_URL}${endpoint}?p=${page}`;

  const headers = generateSignedHeaders({
    method: "GET",
    endpoint,
    body: "",
  });

  const response = await axios.get(url, { headers });
  return response.data;
}
