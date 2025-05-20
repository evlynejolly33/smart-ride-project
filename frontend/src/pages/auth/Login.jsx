import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

    setEmail("");
    setPassword("");
    navigate("/");
  };
  return (
    <div className="w-full h-screen bg-white flex justify-center items-center">
      <div className="bg-white border-1 border-b-slate-800 shadow-2xl p-10 max-w-lg">
        <form onSubmit={handleSubmit}>
              <label className="text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          <button className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
