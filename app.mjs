// installed npm packages:
import express from "express";
import morgan from "morgan";
import log from "@ajar/marker";
// local modules:
import userRouter from './routers/users.router.mjs';

const {HOST, PORT} = process.env;

const app = express();

// top level middlewear:
app.use(morgan('dev'));
// adds to the request a function that knows to do parsing to the req body:
app.use(express.json());

// routing:
app.use('/api/users', userRouter);

// error handling:
app.use((req,res)=>{
    res.status(404).send(`${req.method}: ${req.url} not found........`)
})
// starting the app:

app.listen(PORT,HOST, () => {
    log.magenta(`listening on:`,`http://${HOST}:${PORT}`);
})
