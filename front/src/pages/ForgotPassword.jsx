import ForgotPasswordForm from "../components/ForgotPasswordForm";
import Layout from "../components/Layout";

const ForgotPassword = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Forgot Password
          </h2>
          <ForgotPasswordForm />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
