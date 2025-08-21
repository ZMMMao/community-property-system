import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios.js";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let mounted = true;
    api
      .get("/auth/me")
      .then(() => {
        if (mounted) {
          setOk(true);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setOk(false);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Checking session…</div>;
  return ok ? <Outlet /> : <Navigate to="/login" replace />;
}
