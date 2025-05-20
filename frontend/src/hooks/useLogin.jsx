import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/users/login",
        { email, password }
      );

      // assuming your backend returns token in the response data
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: "LOGIN", payload: data.user });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      // Capture backend error message or a generic one
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return { login, loading, error };
};

export default useLogin;
