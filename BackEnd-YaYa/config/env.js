import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const API_KEY = process.env.YAYA_API_KEY;
export const API_SECRET = process.env.YAYA_API_SECRET;
export const BASE_URL = "https://sandbox.yayawallet.com";
