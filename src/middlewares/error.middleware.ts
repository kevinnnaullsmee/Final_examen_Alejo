import { Response, Request, NextFunction} from "express";

export const errorHandler = (err: any,req: Request,res: Response,next: NextFunction) => {
  console.error(err);

  res.status(500).json({
    message: "error interno del servidor ",
  });
};