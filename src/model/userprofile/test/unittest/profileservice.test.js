const profileServices = require('../../profile.services')
const profileRepositories = require('../../profile.repositories')

jest.mock('../../profile.repositories')

describe('Profile Services Unit Test', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return user when user exists', async () => {
    const userId = '123'

    const mockUser = {
      _id: userId,
      name: 'Test User',
      email: 'test@mail.com'
    }

    profileRepositories.findbyId.mockResolvedValue(mockUser)

    const result = await profileServices.userprofile(userId)

    expect(profileRepositories.findbyId).toHaveBeenCalledWith(userId)
    expect(result).toEqual(mockUser)
  })

  test('should throw error if user not found', async () => {
    const userId = '123'

    profileRepositories.findbyId.mockResolvedValue(null)

    await expect(
      profileServices.userprofile(userId)
    ).rejects.toThrow('User not found')

    expect(profileRepositories.findbyId).toHaveBeenCalledWith(userId)
  })

})
