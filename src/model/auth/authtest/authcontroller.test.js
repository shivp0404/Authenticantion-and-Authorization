const AuthControllers = require('../auth.controllers')
const AuthServices = require('../auth.services')

jest.mock('../auth.services')

const mockReq = (body = {}) => ({
  body
})

const mockRes = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn()
  return res
}

const mockNext = jest.fn()

describe("Testing the Register Controller",()=>{
    test('should register user and return 201', async () => {
  const req = mockReq({
    name: 'A',
    email: 'a@test.com',
    password: '123'
  })

  const res = mockRes()
  const next = jest.fn()

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
  const next = jest.fn()

  const error = new Error('Something went wrong')

  AuthServices.registration.mockRejectedValue(error)

  await AuthControllers.register(req, res, next)

  expect(next).toHaveBeenCalledWith(error)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

})