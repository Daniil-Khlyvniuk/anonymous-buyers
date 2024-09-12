import { userService } from "services"

export const initSettingUsersLoopJob = async (
  timer: number = 200
): Promise<ReturnType<typeof setTimeout>> => {
  await userService.saveUsers()

  return setTimeout(initSettingUsersLoopJob, timer)
}
