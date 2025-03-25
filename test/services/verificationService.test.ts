/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/api/apiClient';
import { verificationService } from '@/services/verificationService';
import { handleApiError, ApiError } from '@/utils/errorHandler';

// Mock the apiClient instance
jest.mock('@/api/apiClient', () => ({
  post: jest.fn(),
}));

// Mock the handleApiError function
jest.mock('@/utils/errorHandler', () => ({
  handleApiError: jest.fn(),
  ApiError: jest.fn().mockImplementation((message: string) => {
    return new Error(message);
  }),
}));

describe('verificationService', () => {
  it('should verify code', async () => {
    // Arrange: Create a mock response
    const mockResponse = { data: { success: true, message: 'Code verification successful' } };

    // Act: Call the function
    (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);
    const response = await verificationService.verifyCode('123456');

    // Assert: Verify the returned response
    expect(response).toEqual(mockResponse.data);
    expect(apiClient.post).toHaveBeenCalledWith('/verify', { code: '123456' });
    expect(apiClient.post).toHaveBeenCalledTimes(1); // Ensures post was called once
  });

  it('should throw an error if verification fails', async () => {
    // Arrange: Create a mock response
    const mockErrorResponse = {
      response: {
        data: {
          success: false,
          error: {
            code: 'INVALID_CODE',
            message: 'Invalid code provided. Please provide a valid 6-digit code.',
            timestamp: '2025-03-25T07:22:49.135Z',
            requestId: '3f2a2c92-35bc-46d3-9b81-209d5f0d17e3',
          },
        },
      },
    };
    const errorMessage = 'Invalid code provided. Please provide a valid 6-digit code.';

    // Mock the post method of apiClient to simulate an error
    (apiClient.post as jest.Mock).mockRejectedValue(mockErrorResponse);

    // Mock handleApiError to throw an ApiError
    (handleApiError as unknown as jest.Mock).mockImplementationOnce((error: any) => {
      throw new ApiError(error.response.data.error.message);
    });

    try {
      await verificationService.verifyCode('123457');
    } catch (error) {
      expect((error as Error).message).toBe(errorMessage);
      expect(handleApiError).toHaveBeenCalledWith(mockErrorResponse);
      expect(apiClient.post).toHaveBeenCalledWith('/verify', { code: '123457' });
    }
  });
});
