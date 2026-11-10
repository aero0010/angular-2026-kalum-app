export class User {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    identityUser?: string;
    roles: string[] = [];
}