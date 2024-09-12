import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import { initOnUserChangeListenerJob, initSettingUsersLoopJob } from "jobs"

config()

const PORT = process.env.PORT || "4000"
const DB_URI = process.env.DB_URI || ""
const app = express()

export const bootstrap = async (): Promise<void> => {
  console.log(`[INFO]: Server running on port ${PORT}`)

  await initOnUserChangeListenerJob()
  await initSettingUsersLoopJob()
}

mongoose
  .connect(DB_URI)
  .then(() => app.listen(PORT, bootstrap))
  .catch(console.dir)
