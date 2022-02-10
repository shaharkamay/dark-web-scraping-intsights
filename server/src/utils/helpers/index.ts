export const withTimeoutPromise = (promise: Promise<any>, ms: number) => {
  const timeout = new Promise((_resolve, reject) =>
    setTimeout(() => reject(`Timed out after ${ms} ms.`), ms)
  );
  return Promise.race([promise, timeout]);
};
