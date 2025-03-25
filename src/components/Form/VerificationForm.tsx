import { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/icons/Logo';
import Button from '@/components/ui/Button';
import InputOTP, { REGEXP_ONLY_DIGITS } from '@/components/ui/InputOTP';
import { Spinner } from '@/components/ui/Spinner';
import { useVerifyCode } from '@/hooks/useVerificationCode';

export default function VerificationForm() {
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();
  const OTP_LENGTH = 6;
  const { mutate: verifyCode, isPending, isError, error } = useVerifyCode();

  // Timer for resend
  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle resend OTP
  const handleResend = async () => {
    setResendTimer(30);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    verifyCode(
      { code: otp },
      {
        onSuccess: (data) => {
          navigate('/success', {
            state: { message: data.message },
          });
        },
        onError: () => {
          // Handle error
        },
      },
    );
  };

  return (
    <div className="bg-white/95 container xs:rounded-xl flex justify-center items-center min-w-full xs:min-w-0 mx-auto xs:mx-auto p-[15px] xs:p-[40px] xs:max-w-[418px] relative">
      <section className="justify-center flex flex-col items-center min-h-full">
        {/* Company Logo */}
        <div className="flex flex-row items-center mb-8">
          <Logo height={64} width={64} />
        </div>
        <h4 className="pb-1 font-medium  mb-15">Verify your email to continue</h4>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 mb-12 xs:mb-20 sm:mb-40 text-center">
          <p className="flex items-center mb-5 text-base text-gray-500">
            Enter the 6-digit verification code sent to your email to complete the process.
          </p>
          <InputOTP count={OTP_LENGTH} pattern={REGEXP_ONLY_DIGITS} resetOTP={isError} onOTPChange={setOtp} />
          {isError && (
            <div className="flex items-center mt-[-8px]">
              <FaExclamationTriangle className="text-red-500 text-xs mr-1" />
              <p className=" text-red-500 text-xs text-left">{error.message || 'Please provide a valid OTP'}</p>
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            type="button"
            label="SUBMIT"
            onClick={handleSubmit}
            disabled={otp.length < 6}
            className="w-[50%] xs:w-[70%] sm:w-full"
          >
            Hello
          </Button>
        </form>

        <p className="text-sm">
          Didn&apos;t receive the code?{' '}
          <a
            href="#"
            onClick={resendTimer > 0 ? undefined : handleResend}
            className={`text-blue-800 ${resendTimer > 0 ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`}
            role="button"
            aria-disabled={resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
          </a>
        </p>
      </section>
      {/* Spinner and overlay inside the main div */}
      {isPending && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary opacity-80">
          <Spinner size={'lg'} variant={'primary'} />
        </div>
      )}
    </div>
  );
}
