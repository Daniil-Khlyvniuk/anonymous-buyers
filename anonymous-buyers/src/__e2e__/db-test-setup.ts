import mongoose from "mongoose"
import { MongoMemoryReplSet, } from "mongodb-memory-server"



beforeAll(async () => {
	const DB_NAME = "my-test-mongo"
	const REPLICA_SET_NAME = "test-replica-set"

	const replSet = await MongoMemoryReplSet.create({
		replSet: {
			dbName: DB_NAME,
			name: REPLICA_SET_NAME,
			count: 1,
			configSettings: { electionTimeoutMillis: 500 }
		}
	})

	await replSet.waitUntilRunning()
	const uri = replSet.getUri()

	await mongoose.connect(uri, {
		replicaSet: REPLICA_SET_NAME,
		dbName: DB_NAME,
	}).then(() => {
		console.log("Mongo connected")
	})
})

afterAll(async () => {
	await mongoose.connection.dropDatabase()
	await mongoose.connection.close()
}, 20000)

