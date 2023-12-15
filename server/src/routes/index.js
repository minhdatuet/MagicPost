const authRouter = require('./auth.js');
const packageRouter = require('./package.js');
const userRouter = require('./user.js')

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/package', packageRouter)
    app.use('/api/v1/user', userRouter)
    return app.use('/', (req, res) => {
        res.send('server...')
    })
}

module.exports = initRoutes