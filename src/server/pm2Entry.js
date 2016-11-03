// ref: <http://pm2.keymetrics.io/docs/usage/use-pm2-with-cloud-providers/>
const pm2 = require('pm2')

const instances = process.env.WEB_CONCURRENCY || -1 // Set by Heroku or -1 to scale to max cpu core -1
const maxMemory = process.env.WEB_MEMORY || 512    // " " "

pm2.connect(() => {
  pm2.start({
    script: './build/server/server.js',
    name: 'production-app',     // ----> THESE ATTRIBUTES ARE OPTIONAL:
    exec_mode: 'cluster',            // ----> https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#schema
    instances,
    max_memory_restart: `${maxMemory}M`,   // Auto restart if process taking more than XXmo
    env: {                            // If needed declare some environment variables
      NODE_ENV: 'production',
      AWESOME_SERVICE_API_TOKEN: 'xxx',
    },
  }, err => {
    if (err) {
      return console.error(
        'Error while launching applications',
        err.stack || err
      )
    }
    console.log('PM2 and application has been succesfully started')

    // Display logs in standard output
    pm2.launchBus((err, bus) => {
      if (err) {
        throw err
      }
      console.log('[PM2] Log streaming started')

      bus.on('log:out', packet => {
        console.log('[App:%s] %s', packet.process.name, packet.data)
      })

      bus.on('log:err', packet => {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data)
      })
      if (err) {
        console.log(err)
      }
    })
  })
})
