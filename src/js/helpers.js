import { TIMEOUT_SECONDS } from './config';

export const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} seconds`)
      );
    }, seconds * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const rawResponse = await Promise.race([
      fetch(url),
      timeout(TIMEOUT_SECONDS),
    ]);
    const recipeData = await rawResponse.json();
    if (!rawResponse.ok)
      throw new Error(`${recipeData.message} (${rawResponse.status})`);
    return recipeData;
  } catch (error) {
    throw error;
  }
};
