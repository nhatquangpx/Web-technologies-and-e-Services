import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API khi component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi tải dữ liệu người dùng!");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading"> Đang tải dữ liệu...</p>;
  if (error) return <p className="error"> {error}</p>;

  return (
    <div className="app">
      <h1 className="title">Danh sách người dùng</h1>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h2>{user.name}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
            <div className="address">
              <p><strong>Địa chỉ:</strong> {user.address.street}, {user.address.city}</p>
              <p><strong>Công ty:</strong> {user.company.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
