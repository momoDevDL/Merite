import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import apiRoutes from "./api/api-routes"
const fileUpload = require('express-fileupload');
require('dotenv').config()

const app = express()
const port = process.env.PORT;

app.use(bodyParser.json({
    extended: true
}));

app.use(fileUpload());

app.use(cors())

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})