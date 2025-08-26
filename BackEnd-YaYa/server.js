import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes fo YaYa Wallet Transactions
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
