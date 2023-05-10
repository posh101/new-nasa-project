const request = require('supertest')
const app = require('../../app')
const 
{mongoConnect,
mongoDisconnect,} = require('../../services/mongo')


describe('Launches API', () => {
   beforeAll(async () => {
      await mongoConnect()
   })

   afterAll(async() => {
    await mongoDisconnect();
   })

   describe('Test GET/launches', () => {
      test('It should respond with 200 success', async () => {
         const response =await  request(app)
         .get('/launches')
         .expect('Content-Type', /json/)
         .expect(200)
      })
     })
     
     describe('Test POST/launches', () => {
     
         const completeLaunchData = {
                 mission: 'USS Enterprise',
                 rocket: 'NCC 1701-D',
                 target: 'Kepler-62 f',
                 launchDate: 'January 4, 2028'
         }
     
     const launchDataWithoutDate = {
             mission: 'USS Enterprise',
             rocket: 'NCC 1701-D',
             target: 'Kepler-62 f',
     }
     
     const launchDataWithInvalidDate = {
         mission: 'USS Enterprise',
                 rocket: 'NCC 1701-D',
                 target: 'Kepler-186 f',
                 launchDate: 'zoot'
     }
     
      test('It should respond with 201 created', async () => {
         const response = await request(app)
         .post('/launches')
         .send(completeLaunchData)
         .expect('Content-Type', /json/)
         
         const requestDate = new Date(completeLaunchData.launchDate).valueOf()
         const responseDate = new Date(response.body.launchDate).valueOf()
         expect(responseDate) === requestDate;
     
         expect(response.body) === launchDataWithoutDate;
      })
     
      test('It should catch missing required properties', async ()=> {
         const response = await request(app)
         .post('/launches')
         .send(launchDataWithoutDate)
         .expect('Content-Type', /json/)
         .expect(400)
         if(!response.body) {
             error: 'Missing required launch property'
         }
      })
      test('It should catch invalid date', async () => {
         const response = await request(app)
         .post('/launches')
         .send(launchDataWithInvalidDate)
         .expect('Content-Type', /json/)
         .expect(400)
         if(!response.body) {
             error: 'Invalid date'
         }
      })
     })
})
