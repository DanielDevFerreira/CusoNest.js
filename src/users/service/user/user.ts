import { UserDto } from "src/users/dto/User";

export interface IUserService {
    createUser(user: UserDto);
    getUser();
    getUserByUsername(username: string): UserDto | undefined;
    deleteUser();
}