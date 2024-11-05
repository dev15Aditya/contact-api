import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSpamLikelihood(phoneNumber: string): Promise<number> {
    try {
        // total spam reports for this number
        const spamCount = await prisma.spam.count({
            where: { phoneNumber }
        });

        // total users who have this number in their contacts
        const contactCount = await prisma.contact.count({
            where: { phoneNumber }
        });

        // Calculate spam likelihood as a percentage
        // If no one has this number in contacts, and it has spam reports, return 100%
        if (contactCount === 0 && spamCount > 0) return 100;
        
        // If there are contacts, calculate the ratio
        if (contactCount > 0) {
            return Math.min(100, (spamCount / (contactCount + spamCount)) * 100);
        }

        return 0;
    } catch (error) {
        console.error('Error in getSpamLikelihood:', error);
        throw error;
    }
}

export async function searchContact(query: string) {
    try {
        const containsQuery = await prisma.contact.findMany({
            where: {
                OR: [

                    {
                        phoneNumber: {
                            contains: query
                        }
                    },
                    {
                        name: {
                            contains: query
                        },
                    }
                ]
            },
            select: {
                name: true,
                phoneNumber: true
            }
        })

        const addingSpamInfo = async (result: any[]) => {
            return Promise.all(result.map(async (result) => ({
                ...result,
                spamLikelihood: await getSpamLikelihood(result.phoneNumber)
            })))
        }

        const resultWithSpamInfo = await addingSpamInfo([...containsQuery]);

        return resultWithSpamInfo;
    } catch (error) {
        console.log(error);
    }
}