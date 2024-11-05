import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Contact {
    name: string;
    phoneNumber: string;
    email?: string;
}

export async function createContact(userId: number, contactData: Contact) {
    try{
        const contact = await prisma.contact.create({
            data: {
                ...contactData,
                userId
            }
        })

        return contact;
    } catch(error) {
        console.log(error);
    }
}

export async function getContacts(userId: number) {
    try {
        const contacts = await prisma.contact.findMany({
            where: {
                userId
            }
        });

        return contacts;
    } catch(error) {
        console.log(error);
    }
}

export async function getContactById(userId: number, contactId: number) {
    try{
        const contact = await prisma.contact.findFirst({
            where: {
                id: contactId,
                userId
            }
        })

        return contact;
    } catch(error) {
        console.log(error);
    }
}