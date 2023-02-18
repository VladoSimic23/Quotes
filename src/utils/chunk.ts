/**
 * A utility function that takes an array and splits it into smaller arrays of the specified chunk size.
 *
 * @param array - The array to be split.
 * @param chunkSize - The size of each chunk.
 * @returns An array of arrays, with each nested array containing a chunk of the original array.
 */
export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = []; // Initialize an empty array to hold the chunks

  // Loop through the array in chunks and add each chunk to the `chunks` array
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks; // array of chunks
};
