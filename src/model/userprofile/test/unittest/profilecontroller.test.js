const ProfileControllers = require('../../profile.controllers')
const profileServices = require('../../profile.services')

jest.mock('../../profile.services')

const mockReq = (user = {}) => ({
  user
})

const mockRes = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn()
  return res
}

const mockNext = jest.fn()

describe('Profile Controllers Unit Test', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return profile data when service resolves', async () => {
    const req = mockReq({ id: '123' })
    const res = mockRes()
    const next = mockNext

    const mockProfile = { _id: '123', name: 'Test', email: 'test@mail.com' }

    profileServices.userprofile.mockResolvedValue(mockProfile)

    await ProfileControllers.getprofile(req, res, next)

    expect(profileServices.userprofile).toHaveBeenCalledWith('123')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Get Profile data',
      data: { userprofile: mockProfile }
    })
    expect(next).not.toHaveBeenCalled()
  })

  test('should call next with error if service throws', async () => {
    const req = mockReq({ id: '123' })
    const res = mockRes()
    const next = mockNext

    const error = new Error('User not found')
    profileServices.userprofile.mockRejectedValue(error)

    await ProfileControllers.getprofile(req, res, next)

    expect(profileServices.userprofile).toHaveBeenCalledWith('123')
    expect(next).toHaveBeenCalledWith(error)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

})
