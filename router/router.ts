import express, {Express, Request, Response} from "express";
import { userRouter } from "./signup";

export const router = express();

router.use("/user", userRouter);

router.get("/", (req: Request, res: Response) => {
    res.status(404).send()
});


