export async function simulateDelay(min = 300, max = 1200): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  await new Promise((resolve) => setTimeout(resolve, delay));
}

export function shouldFail(failureRate = 0.05): boolean {
  return Math.random() < failureRate;
}

export async function simulateApiCall<T>(
  handler: () => T,
  options?: {
    minDelay?: number;
    maxDelay?: number;
    failureRate?: number;
    errorMessage?: string;
  },
): Promise<T> {
  const {
    minDelay = 300,
    maxDelay = 1200,
    failureRate = 0.05,
    errorMessage = "Something went wrong. Please try again.",
  } = options || {};

  await simulateDelay(minDelay, maxDelay);

  if (shouldFail(failureRate)) {
    throw new Error(errorMessage);
  }

  return handler();
}
