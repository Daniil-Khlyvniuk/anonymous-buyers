import { userService } from "services"
import { type ChangeStreamDocument } from "mongodb"
import { UserAnonymizedModel, UserModel } from "models"
import { generateUsersHelper, getAnonymizedUserHelper } from "helpers"
import { type IUser } from "types"

jest.mock("models", () => {
  return {
    UserAnonymizedModel: {
      findOneAndUpdate: jest.fn()
    },
    UserModel: {
      insertMany: jest.fn()
    }
  }
})

jest.mock("helpers", () => ({
  generateUsersHelper: jest.fn(),
  getAnonymizedUserHelper: jest.fn()
}))

describe("User service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("saveUsers", () => {
    it("should save users using UserModel.insertMany and handle success", async () => {
      const mockUsers = [{ firstName: "1", lastName: "User1" }]
      ;(generateUsersHelper as jest.Mock).mockReturnValue(mockUsers)

      await userService.saveUsers()

      expect(generateUsersHelper).toHaveBeenCalled()
      expect(UserModel.insertMany).toHaveBeenCalledWith(mockUsers)
      expect(UserModel.insertMany).toHaveBeenCalledTimes(1)
    })

    it("should throw an error if saving users fails", async () => {
      const error = new Error("InsertMany failed")
      ;(UserModel.insertMany as jest.Mock).mockRejectedValue(error)

      await expect(userService.saveUsers()).rejects.toThrow(
        "[ERROR]:Error on saving users " + error.toString()
      )
    })
  })

  describe("onUserChangeHandler", () => {
    it("should anonymize and save a user when the change operation is insert or update", async () => {
      /* eslint-disable */
	    // @ts-ignore
      const mockUser = { firstName: "1", lastName: "User1", _id: "qwe" } as IUser & { _id: string; }
	    /* eslint-disable */
	    // @ts-ignore
			const mockChange: ChangeStreamDocument<IUser & { _id: string; }> = {
					operationType: "insert",
					fullDocument: mockUser
				}

			;(getAnonymizedUserHelper as jest.Mock).mockReturnValue({
				anonymizedId: "1",
				anonymizedName: "Anonymized User"
			})

			await userService.onUserChangeHandler(mockChange)

	    const saveUsersMock = jest
		    .spyOn(UserAnonymizedModel, "findOneAndUpdate")
		    .mockResolvedValue(mockUser as any)

	    const error = new Error("InsertMany failed")

	    ;(UserAnonymizedModel.findOneAndUpdate as jest.Mock).mockRejectedValue(error)


			expect(getAnonymizedUserHelper).toHaveBeenCalledWith(mockUser)
	    expect(saveUsersMock).toHaveBeenCalled();
		})

		it("should throw an error if anonymizing or saving user fails", async () => {
			/* eslint-disable */
			// @ts-ignore
			const mockUser = { firstName: "1", lastName: "User1", _id: "qwe" } as IUser & { _id: string; }

			/* eslint-disable */
			// @ts-ignore
			const mockChange: ChangeStreamDocument<IUser & { _id: string; }> = {
					operationType: "insert",
					fullDocument: mockUser
				}

			;(getAnonymizedUserHelper as jest.Mock).mockReturnValue({})


			;(UserAnonymizedModel.findOneAndUpdate as jest.Mock).mockRejectedValue(
				new Error("Error: Save failed")
			)

			await expect(userService.onUserChangeHandler(mockChange)).rejects.toThrow(
				"[ERROR]:Error on anonymizing user Error: Error: Save failed"
			)
		})

		it("should do nothing if the change operation is neither insert nor update", async () => {
			/* eslint-disable */
			// @ts-ignore
			const mockChange: ChangeStreamDocument<IUser & { _id: string; }> = {
				operationType: "delete"
			}

			await userService.onUserChangeHandler(mockChange)

			expect(getAnonymizedUserHelper).not.toHaveBeenCalled()
			expect(UserAnonymizedModel.findOneAndUpdate).not.toHaveBeenCalled()
		})
	})
})
