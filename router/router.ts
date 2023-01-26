import express, {Express, Request, Response} from "express";

export const router = express();

router.all("/", (req: Request, res: Response, next) => {
    res.redirect(301, "/api");
});

router.use("/api", (req: Request, res: Response) => {
    res.status(200).send("Refer to the documentation for all the endpoints")
});