const request = require('supertest')
const should = require('should')


describe('UserController', () => {

  /* Wrap for request */
  const api = (url, data, code) => request(sails.hooks.http.app).post(url).send(data).expect(code)

  const user = {
    email: 'test2@test.com',
    password: 'test123test'
  }

  const duplicateEmail = 'test@test.com'
  const wrongPassword = 'wrong'


  describe('Register', () => {

    it('should create user', (done) => {
      api('/api/user', user, 201).then((res) => {should.exist(res.body.email), done()})
    })

    it('should fail create user, duplicate', (done) => {
      const data = {...user, email: duplicateEmail}
      api('/api/user', {...data}, 400).then((res) => {res.body.code.should.be.equal('E_VALIDATION'), done()})
    })
  })

  describe('Login', () => {

    it('should fail login', (done) => {
      const data = {...user, password: wrongPassword}
      api('/api/user/login', data, 403).then((res) => {res.body.should.be.empty(), done()})
    })

    it('should login', (done) => {
      api('/api/user/login', user, 200).then((res) => {should.exist(res.body.email), done()})
    })
  })

  describe('Current', () => {
    let cookies

    it('should login', (done) => {
      api('/api/user/login', user, 200).end((err, res) => {
        cookies = res.headers['set-cookie'].pop().split('')[0]
        done()
      })
    })

    it('should get user', (done) => {
      let req = api('/api/user/current',{},200)
      req.cookies = cookies
      req.end((err, res) => {should.exist(res.body), done()})
    })
  })

  describe('Logout', () => {
    it('should logout', (done) => {
      api('/api/user/logout', {}, 200).then((res) => done()) 
    })
  })
})
