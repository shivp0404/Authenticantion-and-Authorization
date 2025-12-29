const AuthControllers = require('../auth.controllers')
const AuthServices = require('../auth.services')

jest.mock('../auth.services')

const mockReq = (body = {},cookies = {}) => ({
  body, cookies
})

const mockRes = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn()
  res.cookie = jest.fn()
  res.clearCookie = jest.fn()
  return res
}

const mockNext = jest.fn()

describe("Testing the Register Controller",()=>{
   beforeEach(() => {
    jest.clearAllMocks()
  })
    test('should register user and return 201', async () => {
  const req = mockReq({
    name: 'A',
    email: 'a@test.com',
    password: '123'
  })

  const res = mockRes()
  const next = mockNext

  const fakeUser = {
    id: 1,
    name: 'A',
    email: 'a@test.com'
  }

  AuthServices.registration.mockResolvedValue(fakeUser)

  await AuthControllers.register(req, res, next)

  expect(AuthServices.registration).toHaveBeenCalledWith(req.body)
  expect(res.status).toHaveBeenCalledWith(201)
  expect(res.json).toHaveBeenCalledWith({
    message: 'User Created',
    data: fakeUser
  })
  expect(next).not.toHaveBeenCalled()
})

test('should call next with error if service throws error', async () => {
  const req = mockReq({
    email: 'a@test.com'
  })

  const res = mockRes()
  const next = mockNext

  const error = new Error('Something went wrong')

  AuthServices.registration.mockRejectedValue(error)

  await AuthControllers.register(req, res, next)

  expect(next).toHaveBeenCalledWith(error)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

})

describe("Testing the Login Contoller",()=>{
     beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call service and return success response', async () => {
    const req = mockReq({ email: 'test@mail.com', password: 'test123' })
    const res = mockRes()
    const next = mockNext

    const serviceResult = {
      data: { name: 'Test', email: 'test@mail.com' },
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    }

    AuthServices.login.mockResolvedValue(serviceResult)

    await AuthControllers.login(req, res, next)

    expect(AuthServices.login).toHaveBeenCalledWith(req.body)
    expect(res.cookie).toHaveBeenCalledWith(
      'RefreshToken',
      'refresh-token',
      expect.any(Object)
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Login Successful',
      data: { accessToken: 'access-token', data: serviceResult.data }
    })
    expect(next).not.toHaveBeenCalled()
  })

  test('should call next with error if service throws', async () => {
    const req = mockReq({ email: 'test@mail.com', password: 'wrong' })
    const res = mockRes()
    const next = mockNext

    const error = new Error('Invalid credentials')
    AuthServices.login.mockRejectedValue(error)

    await AuthControllers.login(req, res, next)

    expect(next).toHaveBeenCalledWith(error)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(res.cookie).not.toHaveBeenCalled()
  })
})

describe('Testing the Logout Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should logout user and clear refresh token cookie', async () => {
  const req = mockReq({}, { RefreshToken: 'refresh-token' })
    const res = mockRes()
    const next = mockNext

    AuthServices.logout.mockResolvedValue({ message: 'logout' })

    await AuthControllers.logout(req, res, next)

    expect(AuthServices.logout).toHaveBeenCalledWith('refresh-token')

    expect(res.clearCookie).toHaveBeenCalledWith(
      'RefreshToken',
      expect.objectContaining({
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      })
    )

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'logout'
    })

    expect(next).not.toHaveBeenCalled()
  })

  test('should call next with error if service throws', async () => {
    const req = mockReq({}, { RefreshToken: 'refresh-token' })
    const res = mockRes()
    const next = mockNext

    const error = new Error('Invalid refresh token')
    AuthServices.logout.mockRejectedValue(error)

    await AuthControllers.logout(req, res, next)

    expect(AuthServices.logout).toHaveBeenCalledWith('refresh-token')
    expect(next).toHaveBeenCalledWith(error)

    expect(res.clearCookie).not.toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})


