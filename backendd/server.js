const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()

//error handler
const {errorHandler} = require('./middleware/errorMiddleware')

//const connectDB = require('./config/db')
//DB 
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false}))

app.use('/api/goals', require('./routes/getRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
//for errors
app.use(errorHandler)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontendd/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontendd', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }

//for server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at port ${port}`))