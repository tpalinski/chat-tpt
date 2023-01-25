import express, { Express} from 'express';
import dotenv from 'dotenv'
import { router } from './router/router';
import morgan, { Morgan } from "morgan";
import cors from "cors";

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3001;

const logger = morgan('dev');

app.use(logger);
app.use(cors());
app.use(router);



app.listen(port, () => {
    console.log(`App running on port: ${port}`)
});