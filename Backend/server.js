const express = require('express')
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const cors = require('cors');
const detailRouter = require('./routes/detailRoutes.js');
const classRouter = require('./routes/classRoutes.js');
const postRouter = require('./routes/postRoutes.js');
const activityRouter = require('./routes/activityRoutes.js');
const userRouter = require('./routes/userRouter.js');


const app = express()
app.use(cors())
app.use(express.json())

dotenv.config() 
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("Mongodb connect")  
})

app.use('/api/details', detailRouter)
app.use('/api/classes', classRouter)
app.use('/api/posts', postRouter)
app.use('/api/activities', activityRouter)
app.use('/api/users', userRouter)

app.listen(8000,()=>{
  console.log("server running on 8000 port");
})