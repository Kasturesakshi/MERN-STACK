import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const App = () => {
  const [month, setMonth] = useState("03"); // Default to March
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  }, [month, page]);

  const fetchTransactions = async () => {
    const response = await fetch(
      `/transactions?month=${month}&search=${search}&page=${page}&per_page=10`
    );
    const data = await response.json();
    setTransactions(data.transactions);
    setTotalTransactions(data.total);
  };

  const fetchStatistics = async () => {
    const response = await fetch(`/statistics?month=${month}`);
    const data = await response.json();
    setStatistics(data);
  };

  const fetchBarChartData = async () => {
    const response = await fetch(`/bar-chart?month=${month}`);
    const data = await response.json();
    const labels = Object.keys(data);
    const values = Object.values(data);

    setBarChartData({
      labels,
      datasets: [
        {
          label: "Number of Items",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
    fetchTransactions();
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1); // Reset to first page on new month
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  };

  const nextPage = () => {
    if (page * 10 < totalTransactions) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Transactions Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Month: </label>
        <select value={month} onChange={handleMonthChange}>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={handleSearch}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>

      <h2>Transactions</h2>
      <table border="1" style={{ width: "100%", textAlign: "left", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Category</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.price}</td>
              <td>{t.is_sold ? "Yes" : "No"}</td>
              <td>{t.category}</td>
              <td>{t.date_of_sale}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={prevPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={nextPage} disabled={page * 10 >= totalTransactions}>
        Next
      </button>

      <h2>Statistics</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>Total Sales Amount: {statistics.total_sales_amount}</div>
        <div>Total Sold Items: {statistics.total_sold_items}</div>
        <div>Total Not Sold Items: {statistics.total_not_sold_items}</div>
      </div>

      <h2>Bar Chart</h2>
      {barChartData.labels && <Bar data={barChartData} />}
    </div>
  );
};

export default App;
