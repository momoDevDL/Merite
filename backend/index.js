import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import apiRoutes from "./api/api-routes"

const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config()

global.__basedir = __dirname;


const app = express()
const port = process.env.PORT;

app.use('/uploads', express.static(path.join(__dirname, '/assets/uploads')));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(fileUpload());


app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})