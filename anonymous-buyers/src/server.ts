import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import { initOnUserChangeListenerJob, initSettingUsersLoop } from "jobs"

config()

const PORT = process.env.PORT || "5000"
const DB_URI = process.env.DB_URI || ""
const app = express()

const bootstrap = async (): Promise<void> => {
  console.log(`Server running on port ${PORT}`)

  await initOnUserChangeListenerJob()
  void initSettingUsersLoop()
}

mongoose
  .connect(DB_URI)
  .then(() => app.listen(PORT, bootstrap))
  .catch(console.dir)
