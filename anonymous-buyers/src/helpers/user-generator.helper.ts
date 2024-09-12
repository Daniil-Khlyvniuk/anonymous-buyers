import { faker } from "@faker-js/faker"
import { type IUser } from "types"

const mockUser = (): IUser => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      line1: faker.location.streetAddress(),
      line2: faker.location.secondaryAddress(),
      postcode: faker.location.zipCode(),
      state: faker.location.state()
    },
    createdAt: faker.date.past()
  }
}

export const generateUsers = (count?: number): IUser[] => {
  count = (!!count && Math.max(1, count)) || Math.floor(Math.random() * 10) + 1

  return Array(count).fill(mockUser())
}
