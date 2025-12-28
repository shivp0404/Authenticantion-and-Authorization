const AuthServices = require('../auth.services')
const UserRepositories = require('../user.repositories')
const hashPassword = require('../../../utils/bcrypt')

jest.mock('../user.repositories')
jest.mock('../../../utils/bcrypt')

describe("Testing the registration process service",()=>{
    test('should throw error if name is missing', async () => {
  const payload = { email: 'a@test.com', password: '123' }

  await expect(AuthServices.registration(payload))
    .rejects
    .toThrow('Name is not defined')
})

test('should throw error if email is missing', async () => {
  const payload = { name: 'A', password: '123' }

  await expect(AuthServices.registration(payload))
    .rejects
    .toThrow('Email is not defined')
})

test('should throw error if password is missing', async () => {
  const payload = { name: 'A', email: 'a@test.com' }

  await expect(AuthServices.registration(payload))
    .rejects
    .toThrow('Password is not defined')
})

test('should throw error if email already exists', async () => {
  const payload = {
    name: 'A',
    email: 'a@test.com',
    password: '123'
  }

  UserRepositories.findbyEmail.mockResolvedValue(true)

  await expect(AuthServices.registration(payload))
    .rejects
    .toThrow('Email is already existed')
})

test('should register user successfully', async () => {
  const payload = {
    name: 'A',
    email: 'a@test.com',
    password: '123'
  }

  UserRepositories.findbyEmail.mockResolvedValue(null)
  hashPassword.mockResolvedValue('hashedPassword')
  UserRepositories.createUser.mockResolvedValue({
    id: 1,
    name: 'A',
    email: 'a@test.com',
    password: 'hashedPassword'
  })

  const result = await AuthServices.registration(payload)

  expect(hashPassword).toHaveBeenCalledWith('123')
  expect(UserRepositories.createUser).toHaveBeenCalled()
  expect(result.email).toBe('a@test.com')
})


})