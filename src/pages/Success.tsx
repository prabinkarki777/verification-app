import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;

  // Redirect to OTP page if accessed directly without verification
  useEffect(() => {
    if (!message) {
      navigate('/', { replace: true });
    }
  }, [message, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-6">
      {/* Success Icon */}
      <FaCheckCircle className="text-7xl text-dark-purple mb-6" />

      {/* Success Message */}
      <h1 className=" text-center text-dark-purple mb-4">{message || 'OTP Verified Successfully! 🎉'}</h1>

      {/* Go Back Button */}
      <Link
        to="/"
        className="px-6 py-3 text-white bg-dark-purple rounded-lg shadow-md hover:bg-dark-purple-light transition-all duration-300 break-words max-w-full whitespace-normal leading-tight"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default Success;
