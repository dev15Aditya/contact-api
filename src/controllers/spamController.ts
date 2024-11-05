import { Request, Response } from "express";
import { reportSpam } from "../services/spamService";

export const spamController = async (req: Request, res: Response) => {
    try{
        const userId = req.body.userId.userId;
        const {phoneNumber} = req.body;

        const response = await reportSpam(userId, phoneNumber);
        res.status(400).json({...response});
    } catch (error: any){
        console.log(error);
    }
}