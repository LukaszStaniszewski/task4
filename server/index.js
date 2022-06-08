require('dotenv').config({debug: true})

const path = require("path")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require('cookie-parser')
const deserializeUser = require("./middleware/deserializeUser")
const requireUser = require("./middleware/requireUser")
const userControllers = require("./controllers/userControllers")
const sessionControllers = require("./controllers/sessionControllers")
mongoose.connect(process.env.MONGO_URL_CLOUD).
catch(error => console.error(error));

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connected'))

const app = express()


app.use(cors({
  origin: "https://taskmernapp.herokuapp.com",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: false,
}));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json()) 
app.use(deserializeUser) 

const PORT = process.env.PORT || 4000


app.post('/', userControllers.registerUser);

app.post('/api/session', sessionControllers.authenticateUser)

app.get('/api/session', requireUser, sessionControllers.getUserSession)

app.delete('/api/session', requireUser, sessionControllers.deleteSession)

app.get('/user', requireUser, userControllers.sendLoggedInUser)

app.patch('/users', requireUser, userControllers.updateUser)

app.get("/users", requireUser, userControllers.sendUsers)

app.post('/users', requireUser, userControllers.deleteUser)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))


