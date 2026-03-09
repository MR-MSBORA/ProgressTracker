import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const called = useRef(false);

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    // Prevent double API call (React StrictMode)
    if (called.current) return;
    called.current = true;

    const verifyEmail = async () => {
      try {
        console.log("🔍 Verifying token:", token);

        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("📥 Response:", data);

        if (response.ok && data.success) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");

          // Redirect after 3 seconds
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.message || "Email verification failed");
        }
      } catch (error) {
        console.error("❌ Verification error:", error);
        setStatus("error");
        setMessage("Email verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">

          {/* Verifying */}
          {status === "verifying" && (
            <>
              <Loader className="w-16 h-16 mx-auto mb-4 text-primary-600 animate-spin" />
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Verifying Email...
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold mb-2 text-green-600">
                Email Verified! 🎉
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {message}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Redirecting to login page in 3 seconds...
              </p>

              <Link
                to="/login"
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Go to Login Now
              </Link>
            </>
          )}

          {/* Error */}
          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-2xl font-bold mb-2 text-red-600">
                Verification Failed
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {message}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                The verification link may have expired or is invalid.
              </p>

              <div className="flex gap-3 justify-center">
                <Link
                  to="/signup"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Sign Up Again
                </Link>

                <Link
                  to="/login"
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;