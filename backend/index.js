import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import apiRoutes from "./api/api-routes"

const app = express()
const port = 3001

app.use(bodyParser.json());

app.use(cors())

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})