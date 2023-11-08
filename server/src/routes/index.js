import authRouter from './auth.js'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    return app.use('/', (req, res) => {
        res.send('server...')
    })
}

export default initRoutes