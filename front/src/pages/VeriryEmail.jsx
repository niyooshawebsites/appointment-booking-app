import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const VeriryEmail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailVerificationToken = searchParams.get("token");

  useEffect(() => {}, []);

  return <div>VeriryEmail</div>;
};

export default VeriryEmail;
