import { SHA256 } from "crypto-js"

export const anonymizeField = (
  inputString: string,
  outputLength = 8
): string => {
  const hash = SHA256(inputString).toString()

  return outputLength ? hash.substring(0, outputLength) : hash
}
