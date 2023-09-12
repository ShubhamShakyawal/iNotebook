const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express()
const port = 5000 || process.env.PORT

app.use(cors())
app.use(express.json());
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

if(process.env.NODE_ENV=='production'){
  const path = require('path');

  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build','index.html'), err => {
      if(err) {
          res.status(500).send(err)
      }}
    )
  })
}

app.listen(port, () => {
  console.log(`server running on ${port}`)
})