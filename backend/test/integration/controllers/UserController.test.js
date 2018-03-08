const request = require('supertest')
const should = require('should')

xdescribe('UserController', () => {

  /* Wrap for request */
  const post = (url, data, code, cookie = '') => request(sails.hooks.http.app).post(url).set('Cookie', cookie).send(data).expect(code)
  const get = (url, code, cookie = '') => request(sails.hooks.http.app).get(url).set('Cookie', cookie).expect(code)

  const api = {
    register: `/api/user`, // POST
    users: `/api/user`, // GET, admin
    delete: (id) => `/api/user/${id}`,
    login: `/api/user/login`, // POST
    logout: `/api/user/logout`, // POST
    user: `/api/user/current`, // GET
    makeadmin: (id) => `/api/user/${id}/makeadmin`, // POST, admin
    removeadmin: (id) => `/api/user/${id}/removeadmin` // POST, admin
  }

  const user = {
    email: 'test@test.com',
    password: 'test123test'
  }

  const deleteUser = {
    email: 'anothertest@test.com',
    password: 'test123test'
  }

  const newEmail = 'test2@test.com'
  const wrongPassword = 'wrong'

  const code = {
    ok: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403
  }

  describe('Register', () => {

    it('should create user', async () => {
      await post(api.register, {...user, email: newEmail}, code.created).then((res) => {
        should.exist(res.body.email) // users email
      })
    })

    it('should fail create user, duplicate', async () => {
      const data = {...user}
      await post(api.register, {...data}, code.badRequest).then((res) => {
        should.exist(res.body.code) // error code
      })
    })
  })

  describe('Login', () => {

    it('should fail login', async () => {
      const data = {...user, password: wrongPassword}
      await post(api.login, data, code.unauthorized).then((res) => {
        should.exist(res.body.error)
      })
    })

    it('should login', async () => {
      await post(api.login, user, code.ok).then((res) => {
        should.exist(res.body.email) // users email
      })
    })
  })


  describe('Auth', () => {
    let cookie

    describe('Normal', () => {

      // Get cookie
      it('should get cookie after login', async () => {
        await post(api.login, user, code.ok).then((res) => {
          should.exist(res.header['set-cookie']) // cookie
          cookie = res.headers['set-cookie']
        })
      })

      it('should get user', async () => {
        await get(api.user, code.ok, cookie).then((res) => {
          should.exist(res.body.email) // users email
        })
      })

      it('should logout', async () => {
        await post(api.logout, {}, code.ok, cookie).then((res) => {
          should.exist(res.text) // logged out text
        })
      })
    })

    describe('Admin', () => {
      let users

      // Get new cookie
      it('should get cookie after login', async () => {
        await post(api.login, user, code.ok).then((res) => {
          should.exist(res.header['set-cookie']) // cookie
          cookie = res.headers['set-cookie']
        })
      })

      describe('get users', () => {
        it('should get users', async () => {
          await get(api.users, code.ok, cookie).then((res) => {
            should.exist(res.body) // users array
            res.body.should.be.an.Array()
            users = res.body
          })
        })
      })

      xdescribe('makeAdmin', () => {
        it('should make user admin', async () => {
          const { id } = users[2]
          await post(api.makeadmin(''+id), {}, code.forbidden, cookie).then((res) => {
            //console.log(res)
            // todo assertion
          })
        })
      })

      xdescribe('removeAdmin', () => {
        it('should remove admin', async () => {
          const { id } = users[1]
          await post(api.removeadmin(''+id), {}, code.ok, cookie).then((res) => {
            //console.log(res)
            // todo assertion
          })
        })
      })
    })
  })
})
