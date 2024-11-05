import { createUser, loginUser } from "../services/authService";
import { Request, Response } from 'express';

export const registerUserController = async (req: Request, res: Response) => {
    const { name, phoneNumber, email, password } = req.body;

    try {
        const newUser = await createUser({ name, phoneNumber, email, password });

        if (newUser) {
            res.status(newUser.status).json({ user: newUser });
        } else {
            res.status(500).json({ error: "User creation failed" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await loginUser({ phoneNumber, password });

        if (user) {
            res.status(user.status).json({ user });
        } else {
            res.status(500).json({ error: "User login failed" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}