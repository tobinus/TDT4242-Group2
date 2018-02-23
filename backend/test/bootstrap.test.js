const sails = require('sails')

before((done) => {

  // Set testing environment
  process.env.NODE_ENV = 'test'
  process.env.PORT = 9999

  sails.lift({
    // configuration for testing purposes
    models: {
      connection: 'localDiskDb',
      migrate: 'drop'
    }
  }, async (err, server) => {
    if (err) return done(err)

    await populate()
    await update()

    sails.log.info('***** Starting tests... *****')
    console.log('\n')

    done()
  })
})

after((done) => {
  drop().then(() => sails.lower(done))
})


const populate = () => {
  return new Promise(async (resolve, reject) => {
    await User.create({ email: 'test@test.com', password: 'test123test' })
    await User.create({ email: 'anothertest@test.com', password: 'test123test' })
    resolve()
  })
}

const update = () => {
  return User.update({email: 'test@test.com'}, {isAdmin: true})
}

const drop = () => {
  return User.destroy({})
}