import { initSettingUsersLoopJob } from "jobs"
import { userService } from "services"

jest.useFakeTimers()

describe("initSettingUsersLoopJob", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it("should run userService.saveUsers() each 200ms", async () => {
    const DELAY = 200

    const saveUsersMock = jest
      .spyOn(userService, "saveUsers")
      .mockResolvedValue(undefined)

    const timer = await initSettingUsersLoopJob()

    jest.advanceTimersByTime(DELAY)
    jest.advanceTimersByTime(DELAY)
    clearTimeout(timer)

    expect(saveUsersMock).toHaveBeenCalledTimes(2)
    jest.clearAllTimers()
  })
})
