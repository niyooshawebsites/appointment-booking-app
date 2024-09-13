/* eslint-disable no-unused-vars */
import EmailVerificationMsg from "../components/EmailVerificationMsg";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const VeriryEmail = () => {
  const [outCome, setOutCome] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const emailVerificationToken = searchParams.get("token");

  useEffect(() => {
    const emailVerification = async () => {
      await axios
        .put(
          `http://localhost:8000/api/v1/verify-email/${emailVerificationToken}`
        )
        .then((res) => {
          setOutCome(res.data.success);
        })
        .catch((err) => console.log(err));
    };
    emailVerification();
  }, []);

  return (
    <Layout>
      <EmailVerificationMsg outCome={outCome} />
    </Layout>
  );
};

export default VeriryEmail;
