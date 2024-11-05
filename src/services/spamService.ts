import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function reportSpam(userId: number, phoneNumber: string) {
    try{
        const existingUser = await prisma.spam.findFirst({
            where: { 
                AND: [
                    {userId},
                    {phoneNumber}
                ]
            }
        })

        if(existingUser) {
            return {status: 400, message: 'Already reported this number as spam' };
        }

        await prisma.spam.create({
            data: {userId, phoneNumber}
        })
    } catch(error) {
        console.log(error);
    }
}