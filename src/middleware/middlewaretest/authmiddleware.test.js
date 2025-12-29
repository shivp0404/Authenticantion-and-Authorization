const authMiddleware = require('../authmiddleware')
const { VerifyUser } = require('../../utils/jwt')

jest.mock('../../utils/jwt')

const mockReq = (headers = {}) => ({
  headers
})

const mockRes = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn()
  return res
}

const mockNext = jest.fn()

describe('Auth Middleware Unit Test', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return 401 if authorization header is missing', () => {
    const req = mockReq()
    const res = mockRes()

    authMiddleware(req, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token not found' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  test('should return 401 if token does not start with Bearer', () => {
    const req = mockReq({
      authorization: 'Token abc123'
    })
    const res = mockRes()

    authMiddleware(req, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token not found' })
    expect(mockNext).not.toHaveBeenCalled()
  })

  test('should attach user to req and call next for valid token', () => {
    const req = mockReq({
      authorization: 'Bearer validtoken'
    })
    const res = mockRes()

    VerifyUser.mockReturnValue({
      id: '123',
      name: 'TestUser'
    })

    authMiddleware(req, res, mockNext)

    expect(VerifyUser).toHaveBeenCalledWith('validtoken')
    expect(req.user).toEqual({
      id: '123',
      email: 'TestUser'
    })
    expect(mockNext).toHaveBeenCalled()
  })

  test('should call next with error if VerifyUser throws', () => {
    const req = mockReq({
      authorization: 'Bearer invalidtoken'
    })
    const res = mockRes()

    const error = new Error('Invalid token')
    VerifyUser.mockImplementation(() => {
      throw error
    })

    authMiddleware(req, res, mockNext)

    expect(mockNext).toHaveBeenCalledWith(error)
  })
})
