import {
  anonymizeFieldHelper,
  generateUsersHelper,
  getAnonymizedUserHelper
} from "helpers"

describe("getAnonymizedUserHelper", () => {
  it("should return anonymized user", async () => {
    const mockInitialUser = generateUsersHelper(1)[0]
    const mockAnonymizedUser = {
      ...mockInitialUser,
      firstName: anonymizeFieldHelper(mockInitialUser.firstName),
      lastName: anonymizeFieldHelper(mockInitialUser.lastName),
      email:
        anonymizeFieldHelper(mockInitialUser.email.split("@")[0]) +
        "@" +
        mockInitialUser.email.split("@")[1],
      address: {
        ...mockInitialUser.address,
        line1: anonymizeFieldHelper(mockInitialUser.address.line1),
        line2: anonymizeFieldHelper(mockInitialUser.address.line2),
        postcode: anonymizeFieldHelper(mockInitialUser.address.postcode)
      }
    }

    const anonymizedUser = getAnonymizedUserHelper(mockInitialUser)

    expect(anonymizedUser).toEqual(mockAnonymizedUser)
  })
})
