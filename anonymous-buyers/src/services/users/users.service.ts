import { type ChangeStreamDocument } from "mongodb"
import { UserAnonymizedModel, UserModel } from "models"
import { generateUsersHelper, getAnonymizedUserHelper } from "helpers"
import { type IUser } from "types"

const onUserChangeHandler = async (
  change: ChangeStreamDocument<IUser>
): Promise<void> => {
  if (change.operationType === "insert" || change.operationType === "update") {
    const user = change.fullDocument
    if (!user) return

    try {
      const userAnonymized = getAnonymizedUserHelper(user)
      await new UserAnonymizedModel(userAnonymized).save()

      console.log("[info]: User has been anonymized successfully")
    } catch (err) {
      throw new Error("[ERROR]:Error on anonymizing user " + err?.toString())
    }
  }
}

const saveUsers = async (): Promise<void> => {
  const candidatesToSave = generateUsersHelper()

  try {
    await UserModel.insertMany(candidatesToSave)
    console.log("[INFO]: Users saved successfully")
  } catch (err) {
    throw new Error("[ERROR]:Error on saving users " + err?.toString())
  }
}

export default {
  saveUsers,
  onUserChangeHandler
}
