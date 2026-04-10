import { User } from '../models/User';
import { Profile } from '../models/Profile';
export declare class UserService {
    private users;
    private profiles;
    private authService;
    private hashPassword;
    register(username: string, email: string, password: string): {
        user: User;
        token: string;
    };
    login(email: string, password: string): {
        user: User;
        token: string;
    };
    logout(token: string): void;
    getUserById(id: string): User | undefined;
    getAllUsers(): User[];
    updateAccount(userId: string, updates: {
        username?: string;
        email?: string;
    }): User;
    deleteAccount(userId: string): void;
    getProfileByUserId(userId: string): Profile | undefined;
    getProfileById(profileId: string): Profile | undefined;
}
//# sourceMappingURL=UserService.d.ts.map