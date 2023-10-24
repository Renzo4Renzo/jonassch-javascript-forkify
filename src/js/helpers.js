import { TIMEOUT_SECONDS } from './config';

export const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
    }, seconds * 1000);
  });
};

export const ajaxCall = async (url, uploadData = undefined) => {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const rawResponse = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);
    const data = await rawResponse.json();
    if (!rawResponse.ok) throw new Error(`${data.message} (${rawResponse.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
