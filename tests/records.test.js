const { expect, describe, it } = require('@jest/globals')
const request = require('supertest')

const app = require('../app')

describe('Records endpoints', () => {
  it('should return 400 with incorrect endDate', async () => {
    const result = await request(app).post('/records').send({
      startDate: '2006-11-11',
      endDate: '201622',
      minCount: 500,
      maxCount: 1000
    })
    expect(result.status).toEqual(200)
    expect(result.body.code).toEqual(400)
    expect(result.body.msg.endDate).toEqual('string.pattern.base')
  })
  it('should return 400 with incorrect startDate', async () => {
    const result = await request(app).post('/records').send({
      startDate: '2061111',
      endDate: '2016-02-02',
      minCount: 500,
      maxCount: 1000
    })
    expect(result.status).toEqual(200)
    expect(result.body.code).toEqual(400)
    expect(result.body.msg.startDate).toEqual('string.pattern.base')
  })
  it('should return 400 with incorrect minCount', async () => {
    const result = await request(app).post('/records').send({
      startDate: '2006-11-11',
      endDate: '2016-02-02',
      minCount: 'not a number',
      maxCount: 1000
    })
    expect(result.status).toEqual(200)
    expect(result.body.code).toEqual(400)
    expect(result.body.msg.minCount).toEqual('number.base')
  })
  it('should return 400 with incorrect maxCount', async () => {
    const result = await request(app).post('/records').send({
      startDate: '2006-11-11',
      endDate: '2016-02-02',
      minCount: 500,
      maxCount: 'not a number'
    })
    expect(result.status).toEqual(200)
    expect(result.body.code).toEqual(400)
    expect(result.body.msg.maxCount).toEqual('number.base')
  })
  it('should return 0 with correct values', async () => {
    const res = await request(app).post('/records').send({
      startDate: '2016-07-01',
      endDate: '2016-08-01',
      minCount: 2900,
      maxCount: 3000
    })
    expect(res.status).toEqual(200)
    expect(res.body.code).toEqual(0)
    expect(res.body.msg).toEqual('Success')
    expect(Array.isArray(res.body.records)).toBe(true)
  })
})
