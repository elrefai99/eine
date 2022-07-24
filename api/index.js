import express from 'express';
import 'dotenv/config';
import middleware from './src/middleware/App.js'
import database from './src/DataBase/mongoose.js';
import hook from  './src/hook/hook.js';
const app = express();

// Database Connection
database(app)

// Middleware
middleware(app)

// Routers
hook(app)

app.get('/', (req, res)=>{
    res.send( "register" )
})


// Test
export default app;