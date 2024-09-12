import { UserModel } from "models"
import { userService } from "services"
import { initOnUserChangeListenerJob } from "jobs"

describe("initOnUserChangeListenerJob", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should call UserModel.watch and attach onUserChangeHandler", async () => {
    const onMock = jest.fn()

    const watchMock = jest.spyOn(UserModel, "watch").mockReturnValue({
      on: onMock
    } as any)
    const onUserChangeHandlerMock = jest
      .spyOn(userService, "onUserChangeHandler")
      .mockImplementation(async (changeEvent) => {})

    await initOnUserChangeListenerJob()

    expect(watchMock).toHaveBeenCalled()
    expect(onMock).toHaveBeenCalledWith("change", onUserChangeHandlerMock)
  })
})
