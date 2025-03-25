export class ApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any): never => {
  console.error(error);
  if (error.response) {
    const { message } = error.response.data.error || {};
    throw new ApiError(message || 'Unknown API error');
  } else if (error.request) {
    throw new ApiError('No response from server. Please try again later.');
  } else {
    throw new ApiError(error.message || 'Unexpected error. Please try again.');
  }
};
