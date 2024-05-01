import { useEffect } from "react";
import axios from "axios";

export default function Logout() {
  useEffect(() => {
    (async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth_logout/`,
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          {
            withCredentials: true
          }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href="/login"
      } catch (e) {
        console.log("Logout error", e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
}