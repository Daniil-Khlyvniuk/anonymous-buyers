import { userService } from "services"

export const initSettingUsersLoopJob = async (): Promise<void> => {
  await userService.saveUsers()

  setTimeout(initSettingUsersLoopJob, 200)
}
