import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const currentUserAccount = "yayawalletpi";

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/transactions");
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter transactions by query
  const filteredTransactions = transactions.filter((transaction) => {
    const query = searchQuery.toLowerCase();

    const sender = `${transaction.sender?.name || ""} ${
      transaction.sender?.account || ""
    }`.toLowerCase();

    const receiver = `${transaction.receiver?.name || ""} ${
      transaction.receiver?.account || ""
    }`.toLowerCase();

    const cause = (transaction.cause || "").toLowerCase();
    const id = (transaction.id || "").toLowerCase();

    return (
      sender.includes(query) ||
      receiver.includes(query) ||
      cause.includes(query) ||
      id.includes(query)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>YaYa Wallet Transactions Dashboard</h1>

      {/* Search Input */}
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="🔍 Search by sender, receiver, cause or ID"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className={styles.search}
        />
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        {isLoading ? (
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
                  paginatedTransactions.map((transaction, index) => {
                    const isTopup = transaction.is_topup;
                    const isIncoming =
                      isTopup ||
                      transaction.receiver?.account === currentUserAccount;

                    return (
                      <tr
                        key={transaction.id}
                        className={`${styles.row} ${
                          isIncoming ? styles.incoming : styles.outgoing
                        }`}
                      >
                        <td>{startIndex + index + 1}</td>
                        <td>{transaction.id}</td>
                        <td>
                          {transaction.sender?.name} (
                          {transaction.sender?.account})
                        </td>
                        <td>
                          {transaction.receiver?.name} (
                          {transaction.receiver?.account})
                        </td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.currency}</td>
                        <td>{transaction.cause}</td>
                        <td>{formatDate(transaction.created_at_time)}</td>
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
                        : `No Transactions Found for "${searchQuery}".`}
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
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      className={
                        currentPage === pageNumber ? styles.activePage : ""
                      }
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
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
