import * as React from 'react';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';
import { useIsMobile } from '@/utils/isMobile';

export const REGEXP_ONLY_DIGITS_AND_CHARS = /^[a-zA-Z0-9]$/;
export const REGEXP_ONLY_DIGITS = /^[0-9]$/;
export const REGEXP_ONLY_CHARS = /^[a-zA-Z]$/;

export type OTPPattern = typeof REGEXP_ONLY_DIGITS_AND_CHARS | typeof REGEXP_ONLY_DIGITS | typeof REGEXP_ONLY_CHARS;

export interface InputOTPProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  className?: string;
  pattern?: OTPPattern;
  resetOTP?: boolean;
  onComplete?: (otp: string) => void; // Called when OTP is completely entered
  onOTPChange?: (otp: string) => void;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      count = 4,
      className,
      pattern = REGEXP_ONLY_DIGITS_AND_CHARS,
      resetOTP = false,
      onComplete,
      onOTPChange,
      ...props
    },
    ref,
  ) => {
    const [otps, setOtps] = useState(Array(count).fill(''));
    const [disabled, setDisabled] = useState(false);
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
    const isMobile = useIsMobile();

    useEffect(() => {
      if (resetOTP) {
        setOtps(Array(count).fill(''));
        setDisabled(false);
      }
    }, [resetOTP, count]);

    useEffect(() => {
      const otp = otps.join('');
      onOTPChange?.(otp);
      if (otp.length === count && onComplete) {
        onComplete(otp);
        setDisabled(true);
      }
    }, [otps, count, onComplete, onOTPChange]);

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
      const key = e.key;
      if (key === 'Backspace') {
        e.preventDefault();
        setOtps((prev) => {
          const newOtps = [...prev];
          newOtps[index] = '';
          moveFocusToLeft(index);
          return newOtps;
        });
      } else if (key === 'ArrowLeft') {
        moveFocusToLeft(index);
      } else if (key === 'ArrowRight') {
        moveFocusToRight(index);
      } else if (pattern.test(key) && !isMobile) {
        setOtps((prev) => {
          const newOtps = [...prev];
          newOtps[index] = key;
          moveFocusToRight(index);
          return newOtps;
        });
      }
    }

    function moveFocusToRight(index: number) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index]?.blur();
      }
    }

    const moveFocusToLeft = (index: number) => {
      const targetInput = inputRefs.current[index - 1];
      if (targetInput) {
        targetInput.focus();
        // Ensure the cursor is after the first character
        setTimeout(() => {
          targetInput.setSelectionRange(1, 1); // Position the cursor after the first character
        }, 10);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleClick(_index: number): React.MouseEventHandler<HTMLInputElement> | undefined {
      return (event: React.MouseEvent<HTMLInputElement>) => {
        (event.target as HTMLInputElement).setSelectionRange(1, 1);
      };
    }

    function handleMultipleCharacterPaste(data: string, index: number) {
      const dataArray = data.split('');
      // Loop through each character and check if it matches the pattern
      for (let i = 0; i < dataArray.length; i++) {
        if (!pattern.test(dataArray[i])) {
          return; // If a character doesn't match the pattern, stop and don't paste
        }
      }

      // If all characters match the pattern, update the OTP state
      const newOtps = [...otps];
      for (let i = 0; i < dataArray.length; i++) {
        if (index + i < count) {
          newOtps[index + i] = dataArray[i]; // Update OTP array with pasted data
          moveFocusToRight(index + i);
        }
      }
      setOtps(newOtps);
    }
    function handlePaste(index: number): React.ClipboardEventHandler<HTMLInputElement> | undefined {
      return (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData('text');
        handleMultipleCharacterPaste(pasteData, index);
      };
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newOtps = [...otps];
      if ((e.nativeEvent as InputEvent).inputType === 'insertText') {
        const selectedData = (e.nativeEvent as InputEvent).data || e.target.value;
        if (selectedData.length > 1) {
          handleMultipleCharacterPaste(selectedData, index);
        } else if (selectedData.length === 1 && pattern.test(selectedData)) {
          newOtps[index] = selectedData;
          setOtps(newOtps);
          moveFocusToRight(index);
        }
      }
    };

    return (
      <div ref={ref} className={cn('flex gap-2 items-center justify-center sm:gap-2', className)} {...props}>
        {Array.from({ length: count }, (_, index) => (
          <input
            key={index}
            minLength={1}
            type={pattern === REGEXP_ONLY_DIGITS ? 'tel' : 'text'}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={isMobile ? (e) => handleChange(e, index) : undefined}
            readOnly={!isMobile}
            inputMode={pattern === REGEXP_ONLY_DIGITS ? 'numeric' : 'text'}
            autoComplete="one-time-code"
            value={otps[index]}
            className="w-10 h-10 sm:w-12 sm:h-12 border border-primary rounded-md text-center color-primary text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyUp={(e) => handleKeyUp(e, index)}
            onClick={handleClick(index)}
            onPaste={handlePaste(index)}
            disabled={disabled} // Disable input after completion
          />
        ))}
      </div>
    );
  },
);

InputOTP.displayName = 'InputOTP';

export default InputOTP;
