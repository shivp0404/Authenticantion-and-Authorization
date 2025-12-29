const AuthServices = require('../auth.services')
const UserRepositories = require('../user.repositories')
const {hashPassword, hashRefreshToken,comparePassword,compareRefreshToken} = require('../../../utils/bcrypt')
const { GenerateAccessToken,GenerateRefreshToken,decodeRefreshToken} = require('../../../utils/jwt')

jest.mock('../user.repositories')
jest.mock('../../../utils/bcrypt')
jest.mock('../../../utils/jwt')

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


describe("Testing the login process service",()=>{
 test('should throw error if email is missing', async () => {
  const payload = { password: 'test123' }

  await expect(AuthServices.login(payload))
    .rejects
    .toThrow('Email is required')
})


test('should throw error if password is missing', async () => {
  const payload = { email: 'test@mail.com' }

  await expect(AuthServices.login(payload))
    .rejects
    .toThrow('Password is required')
})


test('should throw error if user does not exist', async () => {
  const payload = {
    email: 'test@mail.com',
    password: 'test123'
  }

  UserRepositories.findbyEmail.mockResolvedValue(null)

  await expect(AuthServices.login(payload))
    .rejects
    .toThrow('Email is wrong')
})

test('should throw error if password is wrong', async () => {
  const payload = {
    email: 'test@mail.com',
    password: 'test123'
  }

  UserRepositories.findbyEmail.mockResolvedValue({
    _id: '1',
    name: 'Test',
    email: 'test@mail.com',
    password: 'hashed'
  })

  comparePassword.mockResolvedValue(false)

  await expect(AuthServices.login(payload))
    .rejects
    .toThrow('Password is wrong')
})

test('should login user successfully', async () => {
  const payload = {
    email: 'test@mail.com',
    password: 'test123'
  }

  const user = {
    _id: '1',
    name: 'Test',
    email: 'test@mail.com',
    password: 'hashed'
  }

  UserRepositories.findbyEmail.mockResolvedValue(user)
  comparePassword.mockResolvedValue(true)
  GenerateAccessToken.mockReturnValue('access-token')
  GenerateRefreshToken.mockReturnValue('refresh-token')
  hashRefreshToken.mockResolvedValue('hashed-refresh')
  UserRepositories.saveRefreshToken.mockResolvedValue(user)

  const result = await AuthServices.login(payload)

  expect(result.data.email).toBe('test@mail.com')
  expect(result.accessToken).toBe('access-token')
  expect(result.refreshToken).toBe('refresh-token')
})


  

})

describe('Testing the logout process service', () => {

  const refreshToken = 'valid-refresh-token'
  const decodedPayload = { id: 'user-id' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should logout successfully when refresh token is valid', async () => {
  
    decodeRefreshToken.mockReturnValue(decodedPayload)

    UserRepositories.findRefreshtoken.mockResolvedValue({
      refreshToken: 'hashed-refresh-token'
    })

    compareRefreshToken.mockReturnValue(true)

    UserRepositories.removeRefreshToken.mockResolvedValue(true)

    
    const result = await AuthServices.logout(refreshToken)

    
    expect(decodeRefreshToken).toHaveBeenCalledWith(refreshToken)
    expect(UserRepositories.findRefreshtoken).toHaveBeenCalledWith('user-id')
    expect(compareRefreshToken).toHaveBeenCalledWith(
      refreshToken,
      'hashed-refresh-token'
    )
    expect(UserRepositories.removeRefreshToken).toHaveBeenCalledWith('user-id')
    expect(result).toEqual({ message: 'logout' })
  })

  test('should throw error if refresh token not found in DB', async () => {
    decodeRefreshToken.mockReturnValue(decodedPayload)
    UserRepositories.findRefreshtoken.mockResolvedValue(null)

    await expect(
      AuthServices.logout(refreshToken)
    ).rejects.toThrow('dbtoken not found')
  })

  test('should throw error if refresh token is invalid', async () => {
    decodeRefreshToken.mockReturnValue(decodedPayload)

    UserRepositories.findRefreshtoken.mockResolvedValue({
      refreshToken: 'hashed-refresh-token'
    })

    compareRefreshToken.mockReturnValue(false)

    await expect(
      AuthServices.logout(refreshToken)
    ).rejects.toThrow('invalid Refresh Token')
  })

})
