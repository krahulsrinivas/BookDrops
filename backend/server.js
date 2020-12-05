const mongoose=require('mongoose');
const express=require('express');
const app=express()
const dotenv=require('dotenv');
const cors=require('cors');
dotenv.config();

// App Middlewares
app.use(express.json());
app.use(cors());


// Checking Connection
app.listen(process.env.PORT || 3000,()=>{
    console.log('App is Live');
});

// Connecting to Mongodb
mongoose.connect(process.env.URI,{useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (err) => console.log(`connection error:${err}`));
db.once('open', () => {
    console.log('Mongodb Atlas Connected')
});

// Routes
const userRouter=require('./routes/authRoute');
const home=require('./routes/home')
app.use('/auth',userRouter);
app.use('/test',home)