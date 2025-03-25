import apiClient from '@/api/apiClient';
import { handleApiError } from '@/utils/errorHandler';

export const verificationService = {
  verifyCode: async (code: string) => {
    try {
      const response = await apiClient.post('/verify', { code });
      if (!response.data.success) {
        throw handleApiError(response);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
