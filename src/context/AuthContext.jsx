import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL;
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    checkToken(token);
  }, []);

  async function checkToken(token) {
    try {
      const response = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (result.status === "ok") {
        setUser(result.data);
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (result.status !== "ok") {
        return {
          success: false,
          message: result.message,
        };
      }

      const token = result.data.token;

      localStorage.setItem("token", token);

      const userResponse = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const userResult = await userResponse.json();

      if (userResult.status !== "ok") {
        return {
          success: false,
          message: "Kunne ikke hente brugeroplysninger.",
        };
      }

      setUser(userResult.data);

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        message: "Der opstod en fejl. Prøv igen.",
      };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
