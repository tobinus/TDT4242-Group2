const should = require('should')

describe('UserModel', () => {

  const user = {
    email: 'test2@test.com',
    password: 'test123test'
  }

  it('should find user', (done) => {
    User.find({email: 'test@test.com'}).then((user) => {should.exist(user), done()})
  })

  // Check create user
  // Check password Hash
  // Check checkPassword method

})
