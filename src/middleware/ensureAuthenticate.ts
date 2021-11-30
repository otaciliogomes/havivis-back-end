import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";


function EnsureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    
    if(!authToken) {
        return response.status(401).json({ 
            error: "Não autorizado."
        });
    }

    const [, token] = authToken.split(" ");


    verify(token , process.env.SECRET_APP_AUTHENTUCATE, (error,  decoded) => {
        if (error) {
           throw new Error("ERROR: Usuário não autorizado")
        }

        request.user_id = decoded.id;
        return next();
    });
}

export {EnsureAuthenticate};