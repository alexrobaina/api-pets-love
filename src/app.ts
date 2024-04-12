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

// initializations
const app = express()
dotenv.config()

const port = config.PORT
// settings
app.set('port', port)

const uploadsDir = process.env.UPLOAD_DIR || 'uploads'; 

app.use(morgan('dev'))

app.use(cors({
  origin: 'http://frontend' // O la URL de tu frontend
}));

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
