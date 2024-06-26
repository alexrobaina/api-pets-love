import express from 'express'
// morgan sirve para ver las peticiones a la api cuando esta corriendo el servidor en la consola
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
import routes from './routes'
import path from 'path'
import { config } from './config/config'

const uploadsDir =
  process.env.DEV === 'true' ? 'uploads' : process.env.UPLOAD_DIR || 'uploads'

// initializations
const app = express()
dotenv.config()

const port = config.PORT
// settings
app.set('port', port)

app.use(morgan('dev'))

const getCors = () => {
  if (process.env.BETA === 'true') {
    return 'http://beta-frontend'
  }
  if (process.env.DEV === 'true') {
    return 'http://localhost:3000'
  }
  return 'http://frontend'
}

app.use(
  cors({
    origin: getCors(),
  }),
)

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, uploadsDir)))

app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
passport.use(passportMiddleware)

// routes
app.get('/', (req, res) => {
  res.send(`Welcome to ${config.APP_NAME}`)
})

app.use(routes)

export default app
