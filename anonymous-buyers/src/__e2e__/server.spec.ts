import { config } from "dotenv"
import "./db-test-setup"
import { bootstrap } from "../server"
import { UserAnonymizedModel, UserModel } from "models"


config()

jest.useFakeTimers({ legacyFakeTimers: true })


describe("Database and bootstrap tests", () => {
	beforeAll(async () => {
		console.log("Starting bootstrap...")
		await bootstrap()
		console.log("Bootstrap completed.")
	})

	beforeEach(() => {
		jest.setTimeout(350)
		jest.clearAllMocks()
		jest.clearAllTimers()
		jest.runAllTimers()
	})

	it("should create users and anonymized users", async () => {
		const usersCount = await UserModel.countDocuments({}).exec()
		const anonUsersCount = await UserAnonymizedModel.countDocuments({}).exec()

		expect(usersCount).toBeGreaterThan(0)
		expect(anonUsersCount).toBeGreaterThan(0)
		expect(usersCount === anonUsersCount).toBe(true)
	})

	it("should be the same _id", async () => {
		const users = await UserModel.find({});
		const anonUsers = await UserAnonymizedModel.find({});

		const userIds = users.map(user => user._id.toString());
		const anonUserIds = anonUsers.map(anonUser => anonUser._id.toString());

		userIds.sort();
		anonUserIds.sort();

		expect(userIds).toEqual(anonUserIds);
	})
})
