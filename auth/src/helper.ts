import jwt from 'jsonwebtoken';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


export const signIn = (payload:{}) => {
    return jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: '1h' });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_KEY!);
}

export const toHash = async (password: string) => {
    const salt = randomBytes(8).toString('hex');
    const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
}
export const compare = async (storedPassword: string, suppliedPassword: string) => {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await promisify(scrypt)(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
}


