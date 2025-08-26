import { fetchTransactions } from "../services/yayaService.js";

export const getTransactions = async (req, res) => {
  try {
    const page = 1;
    const data = await fetchTransactions(page);
    res.json(data);
  } catch (error) {
    console.error("Error in transactionController:", error.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};
