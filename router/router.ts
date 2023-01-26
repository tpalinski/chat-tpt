import express, {Express, Request, Response} from "express";

export const router = express();

router.all("/", (req: Request, res: Response) => {
    res.status(404).send("Should be using WebSockets for this")
});


