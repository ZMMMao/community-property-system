import { useEffect, useState } from "react";
import { api } from "../api/axios.js";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setMe(res.data.user))
      .catch(() => setError("Failed to fetch profile"));
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");
    window.location.href = "/login";
  };

  return (
    <div style={{ maxWidth: 640, margin: "48px auto", padding: 24 }}>
      <h2>Dashboard</h2>
      {me && (
        <div
          style={{
            margin: "16px 0",
            padding: 16,
            border: "1px solid #eee",
            borderRadius: 8,
          }}
        >
          <div>
            <b>Name:</b> {me.name}
          </div>
          <div>
            <b>Email:</b> {me.email}
          </div>
          <div>
            <b>Roles:</b> {me.roles?.join(", ")}
          </div>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={logout} style={{ padding: 10 }}>
        Log out
      </button>
    </div>
  );
}
