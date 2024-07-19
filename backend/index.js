const express = require('express');
const cors = require('cors');

const connectdb = require('./server/database/connection');
const  route  = require('./server/user/userRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: `http://localhost:3000`, 
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions));

connectdb();
const port = process.env.PORT;


app.use('/',route)
app.listen(port,()=>{
    console.log('Backend connected');
});