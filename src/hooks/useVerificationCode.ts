import { useMutation } from '@tanstack/react-query';

import { verificationService } from '@/services/verificationService';

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: ({ code }: { code: string }) => verificationService.verifyCode(code),
  });
};
