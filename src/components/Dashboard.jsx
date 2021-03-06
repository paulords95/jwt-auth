import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setAuth(false);
    toast.success("user logged out");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <h1>Dashboard {name}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
