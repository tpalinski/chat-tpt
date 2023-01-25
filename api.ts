import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
    res.send('TypescriptWorks');
});

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
});