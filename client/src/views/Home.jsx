import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/auth/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status !== 200) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    };
    fetchUser();
  }, [navigate]);

  return <div>Home</div>;
};

export default Home;
Home;
