import { SHA256 } from "crypto-js"

export const anonymizeField = (
  inputString: string,
  outputLength = 8
): string => {
  const hash = SHA256(inputString).toString()

  return hash.substring(0, Math.min(outputLength, hash.length) || 1)
}
