/* eslint-disable no-unused-vars */
import EmailVerificationMsg from "../components/EmailVerificationMsg";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

const VeriryEmail = () => {
  const [outCome, setOutCome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const emailVerificationToken = searchParams.get("token");

  useEffect(() => {
    const emailVerification = async () => {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/v1/verify-email/${emailVerificationToken}`
        );

        if (res.data.success) {
          setOutCome(res.data.success);
          setLoading(false);
        }
      } catch (err) {
        toast.error(err.response.data.msg);
      }
    };
    emailVerification();
  }, []);

  return <EmailVerificationMsg outCome={outCome} loading={loading} />;
};

export default VeriryEmail;
