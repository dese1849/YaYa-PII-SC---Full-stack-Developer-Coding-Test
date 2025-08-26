import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTransactions = filtered.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className={styles.search}
        />
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <>
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
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((tx, index) => {
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
                        <td>{startIndex + index + 1}</td>
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
                      {transactions.length === 0
                        ? "No Transactions Available."
                        : `No Transactions Found for "${search}".`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={currentPage === page ? styles.activePage : ""}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
