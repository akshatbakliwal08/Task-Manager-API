const express=require('express');
require('./db/mongoose');
const User=require('./models/user');
const Task=require('./models/task');
const { update } = require('./models/user');
const app=express();
const port=process.env.PORT || 3000;
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log('Server is on port: '+port);
});

    // "dev": "env-cmd config/dev.env nodemon src/index.js"
