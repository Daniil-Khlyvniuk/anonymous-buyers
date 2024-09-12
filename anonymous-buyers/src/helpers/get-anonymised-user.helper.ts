import { type IUser } from "types"
import { anonymizeFieldHelper } from "helpers"

export const getAnonymizedUser = (userDto: IUser): IUser & { _id?: string } => {
  return {
    ...userDto,
    firstName: anonymizeFieldHelper(userDto.firstName),
    lastName: anonymizeFieldHelper(userDto.lastName),
    email:
      anonymizeFieldHelper(userDto.email.split("@")[0]) +
      "@" +
      userDto.email.split("@")[1],
    address: {
      ...userDto.address,
      line1: anonymizeFieldHelper(userDto.address.line1),
      line2: anonymizeFieldHelper(userDto.address.line2),
      postcode: anonymizeFieldHelper(userDto.address.postcode)
    }
  }
}
