const request = require('supertest')
const app = require('../../../../../app') 
const dbConnect = require('../../../../../config/db')
const User = require('../../../auth/user.schema')
const dotenv = require('dotenv')
const { GenerateAccessToken } = require('../../../../utils/jwt')
const { hashPassword } = require('../../../../utils/bcrypt') 


dotenv.config()

beforeAll(async () => {
  await dbConnect(process.env.DB_Test_Link)
})

beforeEach(async () => {
  await User.deleteMany()
})

describe('Integration Test: /profile route', () => {

  let testUser
  let accessToken

  beforeEach(async () => {
   
     const hashedPassword = await hashPassword('123456')
    testUser = await User.create({
      name: 'Test User',
      email: 'profile@test.com',
      password: hashedPassword 
    })

  
    accessToken = GenerateAccessToken({ id: testUser._id, name: testUser.name })
  })

  test('GET /user/profile should return 401 if token missing', async () => {
    const res = await request(app).get('/user/profile')

    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('message', 'Token not found')
  })

  test('GET /user/profile should return profile data with valid token', async () => {
    const res = await request(app)
      .get('/user/profile')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Get Profile data')
    expect(res.body.data.userprofile.email).toBe('profile@test.com')
    expect(res.body.data.userprofile.name).toBe('Test User')
  })


})
