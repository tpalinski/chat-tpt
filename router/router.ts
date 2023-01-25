import express, {Express, Request, Response} from "express";

export const router = express();

router.use("/", (req: Request, res: Response) => {
    res.send("Api is running, to use api type other commands")
})