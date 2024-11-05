import { Request, Response } from "express";
import { searchContact } from "../services/searchService";

export const searchQueryController = async (req: Request, res: Response) => {
    try {
        const query = req.params.query as string;
        console.log("req.query", query);

        const user = await searchContact(query);
        if (user) {
            res.status(200).json({ data: user });
        } else {
            res.status(500).json({ error: "Error fetching user" });
        }
    } catch (error: any){
        console.log(error);
    }
}