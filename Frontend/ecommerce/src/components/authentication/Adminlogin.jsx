import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminlogin from "../../store/adminlogin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAdmin, token, loginAdmin } = useAdminlogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin && token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAdmin, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";
    const DUMMY_TOKEN = "secure-admin-token";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      loginAdmin(DUMMY_TOKEN);
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
