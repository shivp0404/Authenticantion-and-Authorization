const app = require('../../../../app')
const dbConnect = require('../../../../config/db')
const request = require('supertest')
const User = require('../user.schema')
const dotenv = require('dotenv')
dotenv.config();

beforeAll(async () => {
  await dbConnect(process.env.DB_Test_Link)
})

beforeEach(async () => {
  await User.deleteMany()
})

describe("Testing the integrate registration flow",()=>{

    test('POST /auth/register should create user', async () => {
  const response = await request(app)
    .post('/auth/register')
    .send({
      name: 'A',
      email: 'a@test.com',
      password: '123456'
    })

  expect(response.status).toBe(201)
  expect(response.body.message).toBe('User Created')
  expect(response.body.data.email).toBe('a@test.com')
})

test('POST /auth/register should fail if email missing', async () => {
  const response = await request(app)
    .post('/auth/register')
    .send({
      name: 'A',
      password: '123456'
    })

  expect(response.status).toBe(500) // or 400 if handled
  expect(response.body.message).toBeDefined()
})

test('POST /auth/register should fail if email exists', async () => {
  await request(app)
    .post('/auth/register')
    .send({
      name: 'A',
      email: 'a@test.com',
      password: '123456'
    })

  const response = await request(app)
    .post('/auth/register')
    .send({
      name: 'B',
      email: 'a@test.com',
      password: '123456'
    })

  expect(response.status).toBe(500)
})


})
