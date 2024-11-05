import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET=process.env.JWT_SECRET;
const TOKEN_EXPIRY=process.env.TOKEN_EXPIRY;

export async function createUser(data: { name: string, phoneNumber: string, email?: string, password: string }) {
    try {
        const userExist = await prisma.user.findFirst({
            where: {
                phoneNumber: data.phoneNumber
            }
        });

        if (userExist) {
            return {status: 400, message: 'User with this phone number already exist' };
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                ...data,
                email: data.email ? data.email : '',
                password: hashedPassword
            }
        });

        const token = await jwt.sign({userId: user.id}, JWT_SECRET!, {expiresIn: TOKEN_EXPIRY});

        return {
            status: 201,
            message: 'User created successfully',
            token
        };
    } catch (error) {
        console.log(error);
    }
}

export async function loginUser(data: { phoneNumber: string, password: string }) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                phoneNumber: data.phoneNumber
            }
        });

        if (!user) {
            return { status: 400, message: 'User not found' };
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            return { status: 400, message: 'Invalid password' };
        }

        const token = await jwt.sign({userId: user.id}, JWT_SECRET!, {expiresIn: TOKEN_EXPIRY});

        return {
            status: 200,
            message: 'User logged in successfully',
            token
        }
    } catch (error) {
        console.log(error);
    }
}