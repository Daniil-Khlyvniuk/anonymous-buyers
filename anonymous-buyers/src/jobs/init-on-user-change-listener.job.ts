import { UserModel } from "models"
import { userService } from "services"

export const initOnUserChangeListenerJob = async (): Promise<void> => {
  UserModel.watch().on("change", userService.onUserChangeHandler)
}
