const authRouter = require('./auth.js');
const packageRouter = require('./package.js');

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use(packageRouter)
    return app.use('/', (req, res) => {
        res.send('server...')
    })
}

module.exports = initRoutes