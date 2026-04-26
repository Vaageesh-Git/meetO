import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    register: (req: Request, res: Response) => void;
    login: (req: Request, res: Response) => void;
    logout: (req: Request, res: Response) => void;
    getMe: (req: any, res: Response) => void;
}
//# sourceMappingURL=AuthController.d.ts.map