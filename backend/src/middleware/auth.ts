import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

declare global{
    namespace Express{
        interface Request{
            userId?:string
        }
    }   

}



const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid' });
    }
};

export default verifyToken;
