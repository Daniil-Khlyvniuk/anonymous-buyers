import { SHA256 } from "crypto-js"
import { anonymizeFieldHelper } from "helpers"

describe("anonymizeFieldHelper", () => {
  it("should return substring of SHA256 hash", async () => {
    const inputString = "test string to hash"
    const expectedHash = SHA256(inputString).toString()
    const outputLength = 12

    expect(anonymizeFieldHelper(inputString)).toBe(expectedHash.substring(0, 8))
    expect(anonymizeFieldHelper(inputString, outputLength)).toBe(
      expectedHash.substring(0, outputLength)
    )
    expect(anonymizeFieldHelper(inputString, 100)).toBe(expectedHash)
  })
})
