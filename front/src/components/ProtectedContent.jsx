import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedContent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      await axios
        .get("http://locahost:8000/api/v1/")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    checkAuthentication();
  }, []);

  return <div>ProtectedContent</div>;
};

export default ProtectedContent;
