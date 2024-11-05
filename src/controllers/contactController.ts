import { Request, Response } from "express";
import { createContact, getContactById, getContacts } from "../services/contactService";

export const createContactController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId.userId;
        const contactData = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }

        const contact = await createContact(userId, contactData);

        if (contact) {
            res.status(201).json({ message: 'Contact created successfully', data: contact });
        } else {
            res.status(500).json({ error: "Error creating contact" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getContactsController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId.userId;

        const contacts = await getContacts(userId);

        if (contacts) {
            res.status(200).json({ data: contacts });
        } else {
            res.status(500).json({ error: "Error fetching contacts" });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getContactByIdController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId.userId;
        const contactId = parseInt(req.params.id, 10);

        const contact = await getContactById(userId, contactId);

        if (contact) {
            res.status(200).json({ data: contact });
        } else {
            res.status(500).json({ error: "Error fetching contact" });
        }
    } catch (error) {
        console.log(error);
    }
};