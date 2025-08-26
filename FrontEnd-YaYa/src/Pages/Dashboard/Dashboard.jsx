import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUser = "yayawalletpi";

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/transactions");
      setTransactions(res.data.data || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = transactions.filter((tx) => {
    const query = search.toLowerCase();

    const sender = `${tx.sender?.name || ""} ${
      tx.sender?.account || ""
    }`.toLowerCase();
    const receiver = `${tx.receiver?.name || ""} ${
      tx.receiver?.account || ""
    }`.toLowerCase();
    const cause = (tx.cause || "").toLowerCase();
    const id = (tx.id || "").toLowerCase();

    return (
      sender.includes(query) ||
      receiver.includes(query) ||
      cause.includes(query) ||
      id.includes(query)
    );
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>YaYa Wallet Transactions Dashboard</h1>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="🔍 Search by sender, receiver, cause or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>

      {/* 📊 Transactions Table */}
      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Cause</th>
                <th>Created At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((tx, index) => {
                  const isTopup = tx.is_topup;
                  const isIncoming =
                    isTopup || tx.receiver?.account === currentUser;

                  return (
                    <tr
                      key={tx.id}
                      className={`${styles.row} ${
                        isIncoming ? styles.incoming : styles.outgoing
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>{tx.id}</td>
                      <td>
                        {tx.sender?.name} ({tx.sender?.account})
                      </td>
                      <td>
                        {tx.receiver?.name} ({tx.receiver?.account})
                      </td>
                      <td>{tx.amount}</td>
                      <td>{tx.currency}</td>
                      <td>{tx.cause}</td>
                      <td>{formatDate(tx.created_at_time)}</td>
                      <td>
                        <span
                          className={`${styles.badge} ${
                            isIncoming
                              ? styles.badgeIncoming
                              : styles.badgeOutgoing
                          }`}
                        >
                          {isTopup
                            ? "Top-up"
                            : isIncoming
                            ? "Incoming"
                            : "Outgoing"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className={styles.noData}>
                    No transactions found for "<strong>{search}</strong>"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
