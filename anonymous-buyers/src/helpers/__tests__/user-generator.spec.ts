import { generateUsersHelper } from "helpers"

describe("generateUsers", () => {
  it("should generate a default number of users (between 1 and 10) if no count is provided", () => {
    const users = generateUsersHelper()

    expect(users.length).toBeGreaterThan(0)
    expect(users.length).toBeLessThanOrEqual(10)
  })

  it("should generate the specified number of users when count is provided", () => {
    const count = 5
    const users = generateUsersHelper(count)
    expect(users.length).toBe(count)
  })

  it("should handle zero and negative counts by generating a default number of users", () => {
    const usersZero = generateUsersHelper(0)
    expect(usersZero.length).toBeGreaterThan(0)
    expect(usersZero.length).toBeLessThanOrEqual(10)

    const usersNegative = generateUsersHelper(-5)
    expect(usersNegative.length).toBeGreaterThan(0)
    expect(usersNegative.length).toBeLessThanOrEqual(10)
  })
})
