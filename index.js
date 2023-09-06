const express= require('express')
const {sequelize}=require('./models')
const userRoutes = require('./routes/usersRoute');
const cors = require('cors');
require('dotenv').config();
const app=express()

app.use(express.json())
app.use(cors());
app.get("/",(req, res)=>{
    res.send("Hello world")
})
app.use('/auth', userRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})