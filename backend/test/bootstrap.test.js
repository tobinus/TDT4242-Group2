const sails = require('sails');

before((done) => {

  // Set testing environment
  process.env.NODE_ENV = 'test';
  process.env.PORT = 9999;

  sails.lift({
    // configuration for testing purposes
    models: {
      connection: 'localDiskDb',
      migrate: 'drop'
    }
  }, async (err, server) => {
    if (err) return done(err);
    // here you can load fixtures, etc.
    sails.log.info('***** Starting tests... *****');
    console.log('\n');

    await populate()
    await update()

    done(err, server)
  });
});

after((done) => {
  drop().then(() => sails.lower(done))
});


const populate = () => {
  return User.create({ email: 'test@test.com', password: 'test123test' })
}

const update = () => {
  return User.update({email: 'test@test.com'}, {isAdmin: true})
}

const drop = () => {
  return User.destroy({})
}